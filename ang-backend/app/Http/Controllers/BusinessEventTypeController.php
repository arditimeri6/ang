<?php

namespace App\Http\Controllers;

use App\BusinessEventType;
use App\Http\Resources\BusinessEventTypesResource;
use App\Model\Business;
use App\Model\EventType;
use Illuminate\Http\Request;

class BusinessEventTypeController extends Controller
{

    public function index(Business $business)
    {
        $businessEventType = BusinessEventType::where('business_id', $business->id)->get();
        return BusinessEventTypesResource::collection($businessEventType);
    }

    public function store(Request $request, Business $business)
    {
        $delete = BusinessEventType::where('business_id', $business->id)->get();
        if($delete->isEmpty()){
            foreach ($request->all() as $eventType) {
                $business->eventTypes()->attach($eventType);
            }
            return response()->json(['message'=> 'Business and Event type is updated successfully'], 200);
        } else {
            foreach ($delete as $deleted) {
                $deleted->delete();
            }
            foreach ($request->all() as $eventType) {
                $business->eventTypes()->attach($eventType);
            }
            return response()->json(['message'=> 'Business and Event Type is updated successfully'], 200);
        }
    }

    public function getbusinessEventTypes($businessEventType){
        return BusinessEventTypesResource::collection(BusinessEventType::where('business_id', $businessEventType)->get());
    }

    // public function update(Request $request, Business $business, $businessEventType)
    // {
    //     $delete = BusinessEventType::where('business_id', $business->id)->get();
    //     if($delete->isEmpty()){
    //         foreach ($request->all() as $eventType) {
    //             $business->eventTypes()->attach($eventType);
    //         }
    //         return response()->json(['message'=> 'Business and Event type is updated successfully'], 200);
    //     } else {
    //         foreach ($delete as $deleted) {
    //             $deleted->delete();
    //         }
    //         foreach ($request->all() as $eventType) {
    //             $business->eventTypes()->attach($eventType);
    //         }
    //         return response()->json(['message'=> 'Business and Event Type is updated successfully'], 200);
    //     }
    // }

    public function destroy(Business $business, $businessEventType)
    {
        $delete = BusinessEventType::where('id', $businessEventType)->first();
        if($delete){
            $delete->delete();
            return response()->json(['message'=> 'Business and event type is deleted'], 200);
        }else{
            return response()->json(['message'=> 'Business and event type does not exists'], 404);
        }
    }
}
