<?php

namespace App\Http\Resources;
use App\Model\Location;
use Illuminate\Http\Resources\Json\JsonResource;

class PlaceResource extends JsonResource
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
            'id'=> $this->id,
            'title' => $this->title,
            'address' => $this->address,
            'location' => Location::where('id', $this->location_id)->pluck('title')->first(),
            'location_id' => $this->location_id
        ];
    }
}
