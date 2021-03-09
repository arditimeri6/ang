<?php

namespace App\Http\Controllers;

use App\Model\UserBusiness;
use Illuminate\Http\Request;
use App\Http\Resources\UserBusinessResource;
use App\Model\Business;
use App\User;

class UserBusinessController extends Controller
{

    public function index()
    {
        return UserBusinessResource::collection(UserBusiness::all());
    }

    public function getBusinessUsers(Business $business)
    {
        $userBusiness = UserBusiness::where('business_id', $business->id)->get();
        return UserBusinessResource::collection($userBusiness);
    }

    public function show(UserBusiness $businessuser)
    {
        return UserBusinessResource::collection($businessuser);
    }

    public function destroy(UserBusiness $businessuser)
    {
        if ($businessuser) {
            $businessuser->delete();
            return response()->json(['message'=>'User deleted from business successfully'], 200);
        } else {
            return response()->json(['error'=>'User not found'], 401);
        } 
    }

    public function trashed()
    {
        $trashed = UserBusinessResource::collection(UserBusiness::onlyTrashed()->get());
        if($trashed){
            return response()->json($trashed, 200);
        } else {
            return response()->json(['error'=>'Users not found'], 401);
        }
    }

    public function getBusinessUsersTrashed(Business $business)
    {
        $userBusiness = UserBusiness::onlyTrashed()->where('business_id', $business->id)->get();
        $trashed = UserBusinessResource::collection($userBusiness);
        if($trashed){
            return response()->json($trashed, 200);
        } else {
            return response()->json(['error'=>'Users not found'], 401);
        }
    }

    public function restoretrashed($user)
    {
        $trashed = UserBusiness::onlyTrashed()->where('id',$user)->first();
        if($trashed){
            $trashed->restore();
            return response()->json(['message'=>'User is successfully restored in business'], 200);
        } else {
            return response()->json(['error'=>'Users does not exist in trash'], 401);
        }
    }

    public function forcedelete($user)
    {
        $trashed = UserBusiness::onlyTrashed()->where('id',$user)->first();
        if($trashed){
            $trashed->forceDelete();
            return response()->json(['message'=>'User is deleted permanently from business'], 200);
        } else {
            return response()->json(['error'=>'Users does not exist in trash'], 401);
        }
    }
}
