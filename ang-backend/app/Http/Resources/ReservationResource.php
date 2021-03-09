<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
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
            "id" => $this->id,
            'user_id' =>  $this->user_id,
            'business_id'=> $this->business_id,
            'venue_id' => $this->venue_id,
            'date_from' =>  $this->date_from,
            'date_to' => $this->date_to,
            'status' => $this->status,
        ];
    }
}
