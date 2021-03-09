<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\Auth;
use Closure;
use Illuminate\Support\Facades\DB;
class CheckAuthBusinessRegister
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

        if(auth()->user()){
            return $next($request);
        } else {
            $checkvalidcode = DB::table('user_token')->where([
                'email'=> $request->email,
                'verify_token'=> $request->verify_token
            ])->first();
            
            if($checkvalidcode){
                $dbRowToDelete =  DB::table('user_token')->where([
                    'email'=> $request->email,
                    'verify_token'=> $request->verify_token
                ]);
                if($checkvalidcode->expired_at > now()){
                    return $next($request);
                } else {
                    $dbRowToDelete->delete();
                    return response()->json('Token has expired!', 403);
                }
               
            } else{
                return response()->json(['data'=>'Something went wrong.'], 500);
            }
           
        }
      
    }
}
