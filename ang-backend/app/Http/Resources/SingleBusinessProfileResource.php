<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Model\Business;
use App\Http\Resources\PublicPlaceResource;
class SingleBusinessProfileResource extends JsonResource
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
    
    public function handlePlaces($id){
        $business = Business::find($id);
        return PublicPlaceResource::collection($business->places);
    }  

    public function toArray($request)
    {
        return [
            'id' =>$this->id,
            'title' => $this->title,
            'thumbnail' => $this->handleThumbnail($this->id) ? url('/images') .'/'. $this->handleThumbnail($this->id) : 'https://via.placeholder.com/300x160',
            'slug' => $this->slug,
            'places' => $this->handlePlaces($this->id)
        ];
    }
}
