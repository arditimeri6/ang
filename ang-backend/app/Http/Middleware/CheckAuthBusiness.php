<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\Auth;
use Closure;

class CheckAuthBusiness
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
        $validator = '';
        $businessid = (int)$request->route()->parameters()['business'];
        $userbusinesess =  auth()->user()->business;
        
        foreach($userbusinesess as $userbusiness) {
           if($userbusiness->id === $businessid){
               $validator = $userbusiness->id;
           }
        }
        if($validator !== '' && $validator === $businessid){
            return $next($request);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }       
       
    }
}
