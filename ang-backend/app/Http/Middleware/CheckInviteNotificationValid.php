<?php

namespace App\Http\Middleware;
use App\Model\Notification;
use Closure;
use Illuminate\Support\Facades\Auth;
class CheckInviteNotificationValid
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
        $notification = Notification::where([
            'id'=> $request->id,
            'verify_token'=> $request->verify_token
        ])->first();
        if($notification){
            if($notification->expired_at > now()){
                if( auth()->user()->id === $notification->user_id){
                    return $next($request);
                } else {
                    return response()->json(['error'=>'Unauthorized'], 401);
                }
            } else {
                return response()->json(['error'=>'Notification has exppired!'], 404);
            }
     

        } else {
            return response()->json(['error'=>'Notification not found!'], 404);
        }

    }
}
