<?php

namespace App\Http\Middleware;
use Illuminate\Support\Carbon;
use Closure;
use App\Model\BusinessType;
use App\Model\Calendar;
use App\Model\Venue;
class CheckCalendarValid
{


    public function handle($request, Closure $next)
    {
        $date_from = Carbon::parse($request->date_from)->format('Y-m-d H:i:s');
        $date_to = Carbon::parse($request->date_to)->format('Y-m-d H:i:s');
        $business = $request->route()->parameters()['business'];
        if($business->businesstype->title === 'Restaurant'){
            $venueid = $request->validate([
                'venue_id' => 'required',
            ]);   
          
        if($this->dateValidatorRestaurant($request, $business, $date_from, $date_to)){
                return $next($request);
            } else {
                return response()->json(['error'=>'Not valid date'], 401);
            };
        } else {
            if($this->dateValidator($request, $business, $date_from, $date_to)){
                return $next($request);
             } else {
                return response()->json(['error'=>'Not valid date'], 401);
            };
        };
    }

    private function dateValidatorRestaurant($request, $business, $date_from, $date_to){
        $calendarsetting = $business->businessSetings; 
        if($calendarsetting->calendar === 0){
            $venue = Venue::where('id', $request->venue_id)->first();
            $calendar = $venue->calendars()->whereBetween('date_from', [$date_from, $date_to])
                                         ->orWhereBetween('date_to', [$date_from, $date_to])->get();
              if($calendar->count() > 0){
                  return false;
              } else {
                  return true;
              }
        } else {
          return true;
        }
    }

    private function dateValidator($request, $business,  $date_from, $date_to){
        $calendarsetting = $business->businessSetings;
        if($calendarsetting->calendar === 0){
            $calendar = $business->calendars()
            ->whereBetween('date_from', [$date_from, $date_to])
            ->orWhereBetween('date_to', [$date_from, $date_to])->get();
              if($calendar->count() > 0){
                return false;
              } else {
                return true;
              }
        } else {
            return true;
        }
    }

}
