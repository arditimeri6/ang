<?php

namespace App\Model;
use App\Model\BusinessType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Module extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'title'
    ];
    public function businesstypes()
    {
        return $this->belongsToMany(BusinessType::class, 'business_type_modules');
    }
    
}
