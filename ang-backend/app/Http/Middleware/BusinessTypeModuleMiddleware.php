<?php

namespace App\Http\Middleware;

use Closure;
use App\Model\BusinessType;
class BusinessTypeModuleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $validator)
    {
        $validatorEqual = '';
        $business = $request->route()->parameters()['business']->business_type_id;
        $businessType = BusinessType::find($business);
        $businessModules = $businessType->modules;
        foreach ($businessModules as $businessModule) {
            $businesstitlenospace = str_replace(' ', '', $businessModule->title);
            $businesstitle = strtolower($businesstitlenospace);
            if($businesstitle === $validator){
                $validatorEqual = $businesstitle;
            }
        }

        if($validatorEqual !== '' && $validatorEqual === $validator){
            return $next($request);
        } else {
            return response(['error'=>'Method not allowed'], 401);
        }  
    }
}
