<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Model\Event;
use App\User;
use App\Model\Place;
use App\Model\Business;
use App\Http\Resources\UserEventResource;
class CalendarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    // Place::where('id', $this->place_id)->first()
    public function handleBusinessAndPlace($id){
        $place = Place::find($id);
        $business = $place->business;
        $businessname = $place->business->pluck('title')->first();
        if($business->places->count() > 1){
            $placename = $place->pluck('title')->first();
            return $businessname .'-'. $placename;
        } else {
            return $businessname;
        };
    } 
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'date_from' => $this->date_from,
            'date_to' => $this->date_to,
            'status' => $this->status,
            'place' =>  $this->handleBusinessAndPlace($this->place_id),
            'user' => User::where('id', $this->user_id)->pluck('name')->first(),
            'event' => new UserEventResource(Event::where('id', $this->event_id)->first()),
        ];
    }
}
