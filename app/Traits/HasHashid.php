<?php

namespace App\Traits;

use Hashids\Hashids;

trait HasHashid
{
    protected $minHashLength = 6;
    protected $alphabet = 'abcdefghjkmnpqrstuvwxyz23456789';

    public function getRouteKeyName(): string
    {
        return 'hashid';
    }

    protected static function bootHasHashid(): void
    {
        static::created(function ($model) {
            $model->hashid = $model->generateHashid();
            $model->save();
        });
    }

    private function generateHashid(): string
    {
        $hashids = new Hashids(get_class($this), $this->minHashLength, $this->alphabet);

        return $hashids->encode($this->id);
    }
}
