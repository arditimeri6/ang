<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventType extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'title'
    ];

    public function businesses()
    {
        return $this->belongsToMany(Business::class, 'business_event_types');
    }
}
