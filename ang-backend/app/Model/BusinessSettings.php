<?php

namespace App\Model;
use App\Model\Business;
use Illuminate\Database\Eloquent\Model;

class BusinessSettings extends Model
{
    public function business()
    {
        return $this->belongsTo(Business::class, 'business_id');
    }
}
