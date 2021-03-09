<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Traits\HasRoles;

class UserBusiness extends Model
{
    use HasRoles, SoftDeletes;

    protected $guard_name ='api';
}
