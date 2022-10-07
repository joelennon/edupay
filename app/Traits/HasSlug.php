<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Str;

trait HasSlug
{
    protected function slugFieldName(): string
    {
        return 'name';
    }

    protected function slug(): Attribute
    {
        return Attribute::make(
            get: fn () => Str::slug($this->getAttribute($this->slugFieldName()))
        );
    }
}
