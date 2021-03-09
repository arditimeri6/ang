<?php

namespace App\Model;
use App\Model\Business;
use App\Model\BusinessType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Plan extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'title','description','price','active'
    ];
    
    public function businesses()
    {
        return $this->hasMany(Business::class);
    }

    public function businesstypes()
    {
        return $this->belongsToMany(BusinessType::class, 'business_type_plans');
    }
}


