<?php

namespace App\Http\Resources;

use App\Model\BusinessType;
use App\Model\PhotoGallery;
use App\Model\Plan;
use App\Model\TextBox;
use App\Model\VideoGallery;
use Illuminate\Http\Resources\Json\JsonResource;

class BusinessPreviewResource extends JsonResource
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
            'plan' => Plan::where('id',$this->plan_id)->select('id', 'title')->first(),
            'business_type' => BusinessType::where('id',$this->business_type_id)->select('id', 'title')->first(),
            'slug' => $this->slug,
            'status' => $this->status,
            'paid_at' => $this->paid_at,
            'approved_at' => $this->approved_at,
            'textbox' => TextBox::where('business_id',$this->id)->select('id', 'title', 'content')->first(),
            'photogallery' => PhotoGallery::where('business_id',$this->id)->select('id', 'imagepath')->get(),
            'videogallery' => VideoGallery::where('business_id',$this->id)->select('id', 'videoid')->get(),
            'url' => url('/images').'/',
        ];
    }
}
