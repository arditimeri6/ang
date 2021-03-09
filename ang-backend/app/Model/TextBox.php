<?php

namespace App\Model;
use App\Model\Business;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TextBox extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'title','content'
    ];
    public function business()
    {
        return $this->hasOne(Business::class);
    }
}
