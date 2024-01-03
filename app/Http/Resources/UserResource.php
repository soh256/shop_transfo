<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'id' => $this->id,
            'nom' => $this->first_name,
            'prenom' => $this->last_name,
            'sexe' => $this->sexe,
            'adresse' => $this->adresse,
            'ville' => $this->city,
            'tel' => $this->phone,
            'cni' => $this->cni,
            'email' => $this->email,
            'role' => $this->role,
            'orders' => $this->orders,
            'created_at' => Carbon::parse($this->created_at)->format('d M Y'),
            'updated_at' => Carbon::parse($this->updated_at)->format('d M Y')
        ];
    }
}
