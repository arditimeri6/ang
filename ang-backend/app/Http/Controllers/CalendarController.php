<?php

namespace App\Http\Controllers;

use App\Model\Calendar;
use Illuminate\Http\Request;
use App\Model\Business;
use App\Http\Requests\CalendarRequest;
use App\Http\Requests\CalendarEventRequest;
use App\Http\Resources\CalendarResource;
use Illuminate\Support\Carbon;
use App\Model\BusinessType;
use App\Model\Event;
use App\Model\Venue;
use App\Model\Place;
use Illuminate\Support\Facades\Auth;
class CalendarController extends Controller
{
    public function __construct()
    {
        $this->middleware('checkcalendarvalid', ['only' =>['store']]);
    }
    
    public function index(Business $business, Place $place){
            return CalendarResource::collection($place->calendars);
    }

    public function store(CalendarEventRequest $request, Business $business, Place $place)
    {
        $date_from = Carbon::parse($request->date_from)->format('Y-m-d H:i:s');
        $date_to = Carbon::parse($request->date_to)->format('Y-m-d H:i:s');
        
            $calendar =  new Calendar;
            // $calendar->business()->associate($business);
            // if($request->venue_id && $business->businesstype->title === 'Restaurant'){
            //     $venue = Venue::find($request->venue_id);
            //     $calendar->venue()->associate($venue);
            // }
            $calendar->date_from = $date_from;
            $calendar->date_to = $date_to;
            $calendar->status = 0;
            $event = Event::find($request->event_id);
            if($event){
                $event->calendars()->save($calendar);
                return response()->json([
                    "calendar" => $calendar,
                    "data" =>  "Request is pending approval"
               ],201);
            } else {
                return response()->json([
                    "error" =>  "Event Not found"
               ],404);
            }
            

    }

    public function update(Request $request, Business $business, Place $place, Calendar $calendar)
    {
        $date_from = Carbon::parse($request->date_from)->format('Y-m-d H:i:s');
        $date_to = Carbon::parse($request->date_to)->format('Y-m-d H:i:s');
        $calendar->date_from = $date_from;
        $calendar->date_to = $date_to;
        $calendar->status = $request->status;

        $calendar->update();
        return response()->json([
            "data"=> "Reservation is updated",
            "calendar" => new CalendarResource($calendar)
        ], 200);
    }

    public function destroy(Business $business, Calendar $reservation)
    {
        if ($business && $reservation) {
            $reservation->delete();
            return response([
                'data' => 'Reservation is deleted'
            ], 201);
        } else {
            return response([
                'data' => 'Reservation does not exists'
            ], 401);  
        } 
    }

    public function trashed(Business $business)
    {
        $trashed = Calendar::onlyTrashed()->where('business_id', $business->id)->get();
        if($trashed){
            return response()->json($trashed, 200);
        } else {
            return response([
                'data' => 'Reservation is deleted'
            ], 201);
        }
    }

    public function restoretrashed(Business $business, $reservation)
    {
        $trashed = Calendar::onlyTrashed()->first();
        if($trashed){
            $trashed->restore();
            return response()->json(['data'=>'Reservation is successfully restored'], 200);
        } else {
            return response()->json(['error'=>"Reservation does not exist in trash"], 404);
        }
    }

    public function forcedelete(Business $business, $reservation)
    {
        $trashed = Calendar::onlyTrashed()->first();
        if($trashed){
            $trashed->forceDelete();
            return response()->json(['data'=>'Reservation is deleted'], 200);
        } else {
            return response()->json(['error'=>"Reservation does not exist in trash"], 404);
        }
    }

    public function requestReservation(CalendarRequest $request, $placeslug){
        
            $calendar =  new Calendar;  
            $date_from = Carbon::parse($request->from)->format('Y-m-d H:i:s');
            $date_to = Carbon::parse($request->to)->format('Y-m-d H:i:s');      
            $calendar->date_from = $date_from;
            $calendar->date_to = $date_to;   
            $calendar->user()->associate(auth()->user()); 
            $calendar->status = 'pending';
            $place = Place::where('slug', $placeslug)->first();
            $place->calendars()->save($calendar);
            return response()->json([
                "data"=> "Reservation is updated",
                "calendar" => new CalendarResource($calendar),
            ], 200);
    }

    public function getUserReservation(){
        return CalendarResource::collection(auth()->user()->calendars->where('event_id', null));
    }
    // public function validateDate($request)
    // {
    //     $date_from = Carbon::parse($request->date_from)->format('Y-m-d H:i:s');
    //     $date_to = Carbon::parse($request->date_to)->format('Y-m-d H:i:s');

    //     $reservations = Reservation::where(['user_id' => Auth::user()->id, 'business_id' => $request->business_id, 'venue_id' => $request->venue_id])
    //         ->whereBetween('date_from', [$date_from, $date_to])
    //         ->orWhereBetween('date_to', [$date_from, $date_to])
    //         ->get();

    //     if ($reservations->count() > 0) {
    //         // Reservation exists
    //     }
    // }
}
