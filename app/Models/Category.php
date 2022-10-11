<?php

namespace App\Models;

use App\Traits\HasHashid;
use App\Traits\HasSlug;
use App\Traits\HasTenant;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;
    use HasHashid;
    use HasSlug;
    use HasTenant;

    protected $fillable = [
        'tenant_id',
        'name',
        'description',
    ];

    public function url(): Attribute
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
