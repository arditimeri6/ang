<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\User;
class UserEventResource extends JsonResource
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
            'event' => $this->title,
            'name' => User::where('id', $this->user_id)->pluck('name')->first(),
            'email' => User::where('id', $this->user_id)->pluck('email')->first()
        ];
    }
}
