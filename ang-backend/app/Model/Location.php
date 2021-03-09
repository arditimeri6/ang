<?php

namespace App\Model;
use App\Model\Place;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = [
        'title'
    ];
    public function places()
    {
        return $this->hasMany(Place::class);
    }
}
