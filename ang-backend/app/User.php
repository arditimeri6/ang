<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Model\Role;
use App\Model\Business;
use App\Model\Calendar;
use App\Model\Notification;
use App\Model\Event;
use App\Notifications\PasswordResetNotification;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable, HasRoles, SoftDeletes;

    protected $guard_name ='api';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
        // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
    
    public function setPasswordAttribute($value){
        $this->attributes['password'] = Hash::make($value);
        
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function businesses()
    {
        return $this->belongsToMany(Business::class, 'user_businesses');
    }
    
    public function calendars()
    {
        return $this->hasMany(Calendar::class, 'user_id');
    }
  
    public function notifications()
    {
        return $this->hasMany(Notification::class, 'user_id');
    }

    public function events()
    {
        return $this->hasMany(Event::class, 'user_id');
    }

    
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new PasswordResetNotification($token));
    }
}
