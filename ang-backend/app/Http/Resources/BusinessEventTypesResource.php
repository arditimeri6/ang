<?php

namespace App\Http\Resources;

use App\Model\Business;
use App\Model\EventType;
use Illuminate\Http\Resources\Json\JsonResource;

class BusinessEventTypesResource extends JsonResource
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
            'business_id' => $this->business_id,
            'business_title' => Business::where('id', $this->business_id)->pluck('title'),
            'event_type_id' => $this->event_type_id,
            'event_type_title' => EventType::where('id', $this->event_type_id)->pluck('title')
        ];
    }
}
