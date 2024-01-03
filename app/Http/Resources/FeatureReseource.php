<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FeatureReseource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'url'=> $this->url,
            'image'=> config('app.url').$this->image,
            'show_header'=> $this->show_header,
            'status'=> $this->status,
        ];
    }
}
