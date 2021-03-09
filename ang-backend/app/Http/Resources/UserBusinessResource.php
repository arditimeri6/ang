<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\User;
use App\Model\Business;

class UserBusinessResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' =>$this->id,
            'user' =>  User::where('id',$this->user_id)->get(),
            'business' => Business::where('id', $this->business_id)->get(),
            'roles' => $this->roles,
            'permissions' => $this->permissions
        ];
    }
}

