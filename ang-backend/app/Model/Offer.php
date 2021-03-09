<?php

namespace App\Model;
use App\Model\Place;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Offer extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'title','content','price'
    ];


    public function place()
    {
        return $this->belongsTo(Place::class);
    }
}
