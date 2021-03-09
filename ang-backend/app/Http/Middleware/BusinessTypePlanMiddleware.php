<?php

namespace App\Http\Middleware;
use App\Model\BusinessTypePlan;
use Closure;

class BusinessTypePlanMiddleware
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
        $businessTypePlan = BusinessTypePlan::where([
            'plan_id'=> $request->plan_id,
            'business_type_id'=> $request->business_type_id,
        ])->first();

        if($businessTypePlan){
            return $next($request);
        } else {
            return response(["Plan doesn't exist"], 404);
        }
    }
}
