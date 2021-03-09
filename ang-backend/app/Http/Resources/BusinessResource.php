<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\PlanResource;
use App\Model\Plan;
use App\Model\UserBusiness;
use App\Model\Business;
use App\Model\BusinessType;
use App\User;
class BusinessResource extends JsonResource
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
            'logo' => $this->logo ? url('/images') .'/'. $this->logo : null,
            // 'plan' => Plan::where('id',$this->plan_id)->pluck('title'),
            // 'business_type' => BusinessType::where('id', $this->business_type_id)->pluck('title'),
            'plan' => Plan::where('id',$this->plan_id)->select('id', 'title')->first(),
            'business_type' => BusinessType::where('id',$this->business_type_id)->select('id', 'title')->first(),
            'slug' => $this->slug,
            'status' => $this->status,
            'paid_at' => $this->paid_at,
            'approved_at' => $this->approved_at,
            'reason' => $this->reason,
            // business => Business::where('id', $this->business_id)
        ];
    }
}
