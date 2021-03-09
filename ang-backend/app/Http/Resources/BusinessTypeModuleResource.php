<?php

namespace App\Http\Resources;

use App\Model\BusinessType;
use App\Model\Module;
use Illuminate\Http\Resources\Json\JsonResource;

class BusinessTypeModuleResource extends JsonResource
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
            'module_id' => $this->module_id,
            'module_title' => Module::where('id', $this->module_id)->pluck('title')
        ];
    }
}
