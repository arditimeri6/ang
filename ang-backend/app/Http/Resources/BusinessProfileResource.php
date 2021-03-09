<?php

namespace App\Http\Resources;
use App\Model\Business;
use Illuminate\Http\Resources\Json\JsonResource;

class BusinessProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function handleThumbnail($id){
            $business = Business::find($id);
            return $business->photogalleries()->where('feature_banner', 1)->inRandomOrder()->pluck('imagepath')->first();
    } 
    public function toArray($request)
    {
        return [
            'id' =>$this->id,
            'title' => $this->title,
            'thumbnail' => $this->handleThumbnail($this->id) ? url('/images') .'/'. $this->handleThumbnail($this->id) : 'https://via.placeholder.com/300x160',
            'slug' => $this->slug
        ];
    }
}
