<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Model\Calendar;
class Venue extends Model
{
    use SoftDeletes;

    public function business()
    {
        return $this->belongsTo(Business::class, 'business_id');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'venue_id');
    }

    public function menus()
    {
        return $this->hasMany(Menu::class, 'venue_id');
    }

    public function calendars()
    {
        return $this->hasMany(Calendar::class, 'venue_id');
    }
}
