<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'cmdnum' =>$this->order_number,
            'montant' =>$this->nap,
            'client' =>$this->user->first_name . ' ' . $this->user->last_name,
            'statut' =>$this->status,
            'annuler' =>$this->canceled,
            'date' =>$this->created_at,
        ];
    }
}
