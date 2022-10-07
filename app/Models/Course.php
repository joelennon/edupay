<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Scout\Searchable;

class Course extends Model
{
    use HasFactory;
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
    ];

    public $meilisearchSettings = [
        'updateFilterableAttributes' => ['category_id'],
    ];

    public function fee(): Attribute
    {
        return Attribute::make(
            get: fn ($value, $attributes) => $attributes['fee_cents'] / 100
        );
    }

    public function currency(): Attribute
    {
        return Attribute::make(
            get: fn ($value, $attributes) => self::CURRENCIES[$attributes['fee_currency']]
        );
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
