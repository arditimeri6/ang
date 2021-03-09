<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PhotoGalleryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return[
            'id' => $this->id,
            'place' =>$this->place_id,
            'banner' => $this->feature_banner,
            'imagepath' => url('/images') .'/'. $this->imagepath
        ];
    }
}
