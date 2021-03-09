<?php

namespace App\Http\Resources;
use App\Model\Business;
use App\Model\Venue;
use Illuminate\Http\Resources\Json\JsonResource;

class EventCalendarResource extends JsonResource
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
            'business' => Business::where('id',$this->business_id)->pluck('title')->first(),
            'venue' => Venue::where('id',$this->venue_id)->pluck('name')->first(),
            'date_from' => $this->date_from,
            'date_to' => $this->date_to,
            'status' => $this->status
        ];
    }
}
