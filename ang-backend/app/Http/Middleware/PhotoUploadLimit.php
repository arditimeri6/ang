<?php

namespace App\Http\Middleware;

use Closure;

class PhotoUploadLimit
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
        $businessphotomax = $request->route()->parameters()['business']->places->count()*40;
        $businesstotal = $request->route()->parameters()['business']->photogalleries->count();
        if($businesstotal <= $businessphotomax){
            return $next($request);
        }  else {
            return response()->json(['error'=>'you have reached maximum limit for uploading'],  400);
        } 
    }
}
