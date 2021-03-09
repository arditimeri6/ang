<?php

namespace App\Model;
use App\Model\Business;
use App\Model\Offer;
use App\Model\Calendar;
use App\Model\Location;
use Illuminate\Database\Eloquent\Model;
use App\Model\PhotoGallery;
use Illuminate\Database\Eloquent\SoftDeletes;

class Place extends Model
{
    use SoftDeletes;
    
    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    public function offers()
    {
        return $this->hasMany(Offer::class);
    }

    public function calendars()
    {
        return $this->hasMany(Calendar::class);
    }
    public function photogalleries()
    {
        return $this->hasMany(PhotoGallery::class);
    }
    
    public function location()
    {
        return $this->hasOne(Location::class);
    }
}
