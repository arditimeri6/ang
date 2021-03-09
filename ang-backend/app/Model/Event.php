<?php

namespace App\Model;
use App\Model\Calendar;
use Illuminate\Database\Eloquent\Model;
use App\Model\User;
use Illuminate\Database\Eloquent\SoftDeletes;
class Event extends Model
{
    use SoftDeletes;
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function calendars()
    {
        return $this->hasMany(Calendar::class);
    }
}
