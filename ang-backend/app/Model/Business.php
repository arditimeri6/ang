<?php

namespace App\Model;

use App\BusinessEventType;
use App\User;
use App\Model\Offer;
use App\Model\TextBox;
use App\Model\Place;
use App\Model\BusinessType;
use App\Model\VideoGallery;
use App\Model\PhotoGallery;
use App\Model\Banner;
use App\Model\Plan;
use App\Model\Invitation;
use App\Model\Notification;
use App\Model\BusinessSettings;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Business extends Model
{
    use SoftDeletes;
    
    protected $guarded = [];

    public function businesstype()
    {
        return $this->belongsTo(BusinessType::class, 'business_type_id');
    }
    
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_businesses');
    }

    public function textbox()
    {
        return $this->hasOne(TextBox::class);
    }

    public function videogalleries()
    {
        return $this->hasMany(VideoGallery::class, 'business_id');
    }

    public function photogalleries()
    {
        return $this->hasMany(PhotoGallery::class, 'business_id');
    }

    public function banner()
    {
        return $this->hasMany(Banner::class, 'business_id');
    }
    


    public function invitations(){
        return $this->hasMany(Invitation::class, 'business_id');
    }
    
    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    public function places()
    {
        return $this->hasMany(Place::class, 'business_id');
    }
    
    public function eventTypes()
    {
        return $this->belongsToMany(EventType::class, 'business_event_types');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function businessSetings()
    {
        return $this->hasOne(BusinessSettings::class);
    }
}
