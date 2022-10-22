<?php

namespace App\Models;

use App\Traits\HasHashid;
use App\Traits\HasSlug;
use App\Traits\HasTenant;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Course extends Model implements HasMedia
{
    use HasFactory;
    use HasHashid;
    use HasSlug;
    use HasTenant;
    use Searchable;
    use InteractsWithMedia;

    private const CURRENCIES = [
        'EUR' => '€',
    ];

    protected $perPage = 12;

    protected $casts = [
        'new' => 'boolean',
    ];

    public $meilisearchSettings = [
        'updateFilterableAttributes' => ['tenant_id', 'category_id'],
    ];

    protected function slugFieldName(): string
    {
        return 'title';
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('banner')
            ->singleFile()
            ->useFallbackUrl('/courses/default-banner-small.jpeg');
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('tiny')
            ->width(50)
            ->blur(75);

        $this->addMediaConversion('small')
            ->width(300)
            ->sharpen(10);

        $this->addMediaConversion('medium')
            ->width(600)
            ->sharpen(10);

        $this->addMediaConversion('large')
            ->width(1000)
            ->sharpen(10);
    }

    public function fee(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->currency.(string) ($this->fee_cents / 100)
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

    public function bannerSmallUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->getFirstTemporaryUrl(now()->addMinutes(5), 'banner', 'small')
        );
    }

    public function bannerLargeUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->getFirstTemporaryUrl(now()->addMinutes(5), 'banner', 'large')
        );
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function enrolments(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'enrolments')
            ->withTimestamps();
    }
}
