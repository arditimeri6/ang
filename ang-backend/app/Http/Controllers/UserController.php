<?php

namespace App\Http\Controllers;

use App\User;
use App\Model\Business;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\NotificationResource;
use App\Http\Requests\NotificationRegisterRequest;
use App\Http\Resources\UserResource;
use App\Model\Notification;

class UserController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth:api');
        $this->middleware('checkinvitenotificationvalid',['only'=>['registerUserFromNotification']]);
        $this->middleware('permission:edit user',['only'=>['update']]);
        $this->middleware('permission:archive user',['only'=>['destroy']]);
        $this->middleware('permission:delete user',['only'=>['forcedelete']]);
    }
    
    public function getNotification(){
        $notification = auth()->user()->notifications()->where('expired_at', '', now())->orWhere('expired_at', null)->get();
         return  NotificationResource::collection($notification);
    
    }
    public function registerUserFromNotification(NotificationRegisterRequest $request){
        $notification = Notification::where([
            'id'=> $request->id,
            'verify_token'=> $request->verify_token
        ])->first();
        if($notification){
            $business = Business::find($notification->business_id);
            auth()->user()->business()->attach($business);
        }
        $notification->expired_at = now();
        $notification->update();
        return response()->json(['message'=>'Sucessfully Registered'], 200);
    }

    public function update(User $user, $request)
    {
        if ($user) {
            $user->name = $request->name;
            $user->email = $request->email;
            $user->syncRoles([$request->role]);
            $user->update();
            return response()->json(['message'=>'User updated successfully'], 200);
        } else {
            return response()->json(['error'=>'User not found'], 401);
        } 
    }

    public function updateStatus(User $user, Request $status)
    {
        // return response()->json($status);
        if ($user) {
            $user->status = $status[0];
            $user->update();
            return response()->json(['message'=>'Status changed succesfully'], 200);
        } else {
            return response()->json(['error'=>'User not found'], 401);
        } 
    }

    public function destroy(User $user)
    {
        if ($user) {
            $user->delete();
            return response()->json(['message'=>'User deleted successfully'], 200);
        } else {
            return response()->json(['error'=>'User not found'], 401);
        } 
    }

    public function trashed()
    {
        $trashed = UserResource::collection(User::onlyTrashed()->get());
        if($trashed){
            return response()->json($trashed, 200);
        } else {
            return response()->json(['error'=>'Users not found'], 401);
        }
    }

    public function restoretrashed($user)
    {
        $trashed = User::onlyTrashed()->where('id',$user)->first();
        if($trashed){
            $trashed->restore();
            return response()->json(['message'=>'User is successfully restored'], 200);
        } else {
            return response()->json(['error'=>'Users does not exist in trash'], 401);
        }
    }

    public function forcedelete($user)
    {
        $trashed = User::onlyTrashed()->where('id',$user)->first();
        if($trashed){
            $trashed->forceDelete();
            return response()->json(['message'=>'User is deleted'], 200);
        } else {
            return response()->json(['error'=>'Users does not exist in trash'], 401);
        }
    }
}
