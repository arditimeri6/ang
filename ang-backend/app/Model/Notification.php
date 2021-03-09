<?php

namespace App\Model;
use App\User;
use App\Model\Business;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = [
        'type','data','verify_token','expired_at'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function business()
    {
        return $this->belongsTo(Business::class);
    }
}
