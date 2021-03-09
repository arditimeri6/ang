<?php

namespace App\Model;
use App\Model\Business;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Banner extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'imagepath'
    ];
    
    public function business()
    {
        return $this->belongsTo(Business::class);
    }
}
