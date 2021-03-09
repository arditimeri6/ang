<?php

namespace App\Http\Resources;
use App\Model\Calendar;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\EventCalendarResource;
class EventResource extends JsonResource
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
            'title' => $this->title,
            'date'=> $this->date,
            'event_details' => EventCalendarResource::collection(Calendar::where('event_id', $this->id)->get()),
        ];
    }
}
