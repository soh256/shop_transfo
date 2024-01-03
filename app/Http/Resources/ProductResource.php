<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            "id"=>$this->id,
            "designation"=>$this->designation,
            "model"=>$this->model,
            "prix"=>$this->price,
            "qte_stock"=>$this->qte_stock,
            "remise"=>$this->discount,
            "image"=>config('app.url') . $this->featured_image,
            // "image"=> $this->featured_image,
            "description"=>$this->description,
            "marque"=> strtolower($this->brand->name),
            "category"=> strtolower($this->category->name),
            "images"=> ImageResource::collection($this->images),
            "note"=> $this->ratings,
            "statut"=>$this->status,
            "in_coming"=>$this->in_coming,
            "recommend"=>$this->recommend,
            'created_at' => Carbon::parse($this->created_at)->format('d M Y'),
            'updated_at' => Carbon::parse($this->updated_at)->format('d M Y'),
        ];
    }
}
