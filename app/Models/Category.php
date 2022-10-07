<?php

namespace App\Models;

use App\Traits\HasHashid;
use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;
    use HasHashid;
    use HasSlug;

    protected $appends = [
        'uri', 'slug',
    ];

    public function uri(): Attribute
    {
        return Attribute::make(
            get: fn () => "/categories/{$this->slug}-{$this->hashid}"
        );
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }
}
