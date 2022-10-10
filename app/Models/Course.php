<?php

namespace App\Models;

use App\Traits\HasHashid;
use App\Traits\HasSlug;
use App\Traits\HasTenant;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Scout\Searchable;

class Course extends Model
{
    use HasFactory;
    use HasHashid;
    use HasSlug;
    use HasTenant;
    use Searchable;

    private const CURRENCIES = [
        'EUR' => '€',
    ];

    protected $casts = [
        'new' => 'boolean',
    ];

    protected $appends = [
        'fee',
        'currency',
        'url',
    ];

    public $meilisearchSettings = [
        'updateFilterableAttributes' => ['tenant_id', 'category_id'],
    ];

    protected function slugFieldName(): string
    {
        return 'title';
    }

    public function fee(): Attribute
    {
        return Attribute::make(
            get: fn () => (string) ($this->fee_cents / 100)
        );
    }

    public function currency(): Attribute
    {
        return Attribute::make(
            get: fn () => self::CURRENCIES[$this->fee_currency]
        );
    }

    public function url(): Attribute
    {
        return Attribute::make(
            get: fn () => "/courses/{$this->slug}-{$this->hashid}"
        );
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
