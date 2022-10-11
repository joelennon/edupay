<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CourseShowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'bannerUrl' => $this->banner_large_url,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'description' => $this->description,
            'tutor' => $this->tutor,
            'code' => $this->code,
            'day' => $this->day,
            'duration' => $this->duration,
            'startTime' => $this->start_time,
            'endTime' => $this->end_time,
            'fee' => $this->fee,
            'new' => $this->new,
        ];
    }
}
