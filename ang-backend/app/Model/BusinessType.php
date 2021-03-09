<?php

namespace App\Model;
use App\Model\Business;
use App\Model\Plan;
use App\Model\Module;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BusinessType extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'title'
    ];

    public function businesses()
    {
        return $this->hasMany(Business::class);
    }
    
    public function plans()
    {
        return $this->belongsToMany(Plan::class, 'business_type_plans');
    }

    public function modules()
    {
        return $this->belongsToMany(Module::class, 'business_type_modules');
    }
}
