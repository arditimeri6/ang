<?php

namespace App\Model;
use App\Model\Business;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VideoGallery extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'title','content','videoid'
    ];
    
    public function business()
    {
        return $this->belongsTo(Business::class);
    }
}
