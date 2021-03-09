<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Menu extends Model
{
    use SoftDeletes;

    protected $guarded = [];
    
    public function business()
    {
        return $this->belongsTo(Business::class, 'business_id');
    }

    public function venue()
    {
        return $this->belongsTo(Venue::class, 'venue_id');
    }

    public function photos()
    {
        return $this->hasMany(MenuPhoto::class, 'menu_id');
    }
}
