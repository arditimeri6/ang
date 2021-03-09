<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Model\PhotoGallery;
use App\Model\Location;
class PublicPlaceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
     public function handleThumbnail($id){
        $thumbnail = PhotoGallery::where('place_id', $id)->inRandomOrder()->pluck('imagepath')->first();
        if( $thumbnail){
            return $thumbnail;
        }
    } 
    public function toArray($request)
    {
   
        return [
            'id'=> $this->id,
            'title' => $this->title,
            'address' => $this->address,
            'slug' => $this->slug,
            'location' => Location::where('id', $this->location_id)->pluck('title')->first(),
            'thumbnail' =>  $this->handleThumbnail($this->id) ? url('/images') .'/'. $this->handleThumbnail($this->id) : 'https://via.placeholder.com/300x160',
        ];
    }
}
