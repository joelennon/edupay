<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\EngineManager;
use Laravel\Scout\Searchable;
use MeiliSearch\Client;
use ReflectionClass;

class ScoutSetup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scout:setup {model? : Class name of model to update settings}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Setup configuration with Meilisearch';

    /**
     * The Meilisearch client.
     *
     * @var CLient
     */
    private $client;

    public function __construct()
    {
        parent::__construct();

        $this->client = app(EngineManager::class)->driver('meilisearch');
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(): void
    {
        if ($namespace = $this->argument('model')) {
            $model = new $namespace();
            $this->setupModel($model);

            return;
        }

        $this->setupAll();
    }

    /**
     * Setup a single model with Meilisearch settings.
     *
     * @param Model $model
     * @return void
     */
    private function setupModel(Model $model): void
    {
        if ($this->hasSettings($model)) {
            $this->updateSettings($model);
        }
    }

    /**
     * Run setup for all models in the app.
     *
     * @return void
     */
    private function setupAll(): void
    {
        $models = collect(scandir(app_path('Models')));
        $models->each(function ($path) {
            if ($path === '.' || $path === '..') {
                return true;
            }

            $namespace = 'App\Models\\'.substr($path, 0, -4);
            $reflection = new ReflectionClass($namespace);
            $validModel = $reflection->isSubclassOf(Model::class) && ! $reflection->isAbstract() && ! $reflection->isTrait();

            if ($validModel) {
                $model = new $namespace();
                $this->setupModel($model);
            }
        });
    }

    /**
     * Update settings for a given model.
     *
     * @param Model $model
     * @return void
     */
    private function updateSettings(Model $model): void
    {
        $index = $this->client->index($model->searchableAs());
        $settings = collect($model->meilisearchSettings);
        $settings->each(function ($value, $key) use ($index) {
            $status = $index->{$key}($value);
            $this->line("{$key} has been updated, updateId: {$status['indexUid']}");
        });
    }

    /**
     * Check that model uses Searchable trait and meilisearchSettings property is set.
     *
     * @param Model $model
     * @return bool
     */
    private function hasSettings(Model $model): bool
    {
        return in_array(Searchable::class, class_uses($model)) && property_exists($model, 'meilisearchSettings');
    }
}
