<?php

namespace App\Model;
use App\Model\Business;
use App\Model\Place;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PhotoGallery extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
      'imagepath'
    ];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }
    public function place()
    {
        return $this->belongsTo(Place::class);
    }
}
