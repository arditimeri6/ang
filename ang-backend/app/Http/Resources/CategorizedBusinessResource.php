<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\BusinessProfileResource;
use App\Model\Business;
class CategorizedBusinessResource extends JsonResource
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
            'title' => $this->title,
            'businesses' => BusinessProfileResource::collection(Business::where('business_type_id', $this->id)->get()),
        ];
    }
}
