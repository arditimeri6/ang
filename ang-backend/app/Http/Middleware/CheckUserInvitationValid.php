<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Model\Business;
use App\Model\Invitation;
use App\User;
class CheckUserInvitationValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    { 

        $business = Business::where('title', $request->title)->first();
        if(Auth()->user()){
            return response()->json(["data"=>"dashboard!"], 403);
        } else {
            $user = User::where('email', $request->email)->first();
            if($user){
                return response()->json(["data"=>"login"], 403);
            } else {
                $invitation = Invitation::where([
                'email' => $request->email,
                'business_id' => $business->id,
                'verify_token' => $request->verify_token
                ])->first();
                if($invitation){
                    if($invitation->expired_at > now()){
                        return $next($request);
                    } else {
                        $invitation->delete();
                        return response()->json(['error'=>'Token has expired!'], 403);
                    }
                } else {
                    return response()->json(['error'=>'Method not allowed.'], 500);
                }
            }
        }
       
      
    
                
   
  
    }
}
