<?php

namespace App\Model;
use App\Model\Business;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Invitation extends Model
{

    // use SoftDeletes;
    protected $fillable = [
        'email','verify_token','expired_at'
    ];
    public function businesses()
    {
        return $this->hasMany(Business::class);
    }
}
