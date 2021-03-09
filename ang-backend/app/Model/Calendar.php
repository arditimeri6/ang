<?php

namespace App\Model;
use App\Model\Event;
use App\Model\Place;
use App\User;
use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{   
    protected $dates = ['date_from', 'date_to'];
    public function place()
    {
        return $this->belongsTo(Place::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
