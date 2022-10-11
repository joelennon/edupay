<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CourseListResource extends JsonResource
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
            'bannerUrl' => $this->banner_small_url,
            'url' => $this->url,
            'title' => $this->title,
            'day' => $this->day,
            'duration' => $this->duration,
            'startTime' => $this->start_time,
            'endTime' => $this->end_time,
            'fee' => $this->fee,
            'new' => $this->new,
        ];
    }
}
