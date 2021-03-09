<?php

namespace App\Http\Resources;

use App\Model\BusinessType;
use App\Model\Plan;
use Illuminate\Http\Resources\Json\JsonResource;

class BusinessTypePlansResource extends JsonResource
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
            'business_type_id' => $this->business_type_id,
            'business_type_title' => BusinessType::where('id', $this->business_type_id)->pluck('title'),
            'plan_id' => $this->plan_id,
            'plan_title' => Plan::where('id', $this->plan_id)->pluck('title')
        ];
    }
}
