<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MenuPhoto extends Model
{
    use SoftDeletes;

    public function menu()
    {
        return $this->belongsTo(Menu::class, 'menu_id');
    }
}
