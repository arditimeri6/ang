<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventTypeRequest;
use App\Http\Resources\EventTypesResource;
use App\Model\Business;
use App\Model\EventType;
use Illuminate\Http\Request;

class EventTypesController extends Controller
{
    
    public function index()
    {
        return EventTypesResource::collection(EventType::all());
    }

    public function store(EventTypeRequest $request)
    {
        $eventType = new EventType;
        $eventType->title = $request->title;
        $eventType->save();
        return response([
            'message' => 'Event type is created'
        ], 201);
    }

    public function show(EventType $eventType)
    {
        return new EventTypesResource($eventType);
    }

    public function update(EventTypeRequest $request, EventType $eventType)
    {
        $eventType->update($request->all());
        return response(['message' => 'Event type is updated',], 200);
    }

    public function destroy(EventType $eventType)
    {
        if($eventType){
            $eventType->delete();
            return response()->json(['message'=> 'Event type is deleted'], 200);
        }else{
            return response()->json(['message'=> 'Event type does not exists'], 404);
        }
    }

    public function trashed()
    {
        $trashed = EventTypesResource::collection(EventType::onlyTrashed()->get());
        if($trashed){
            return response()->json($trashed, 200);
        } else {
            return response()->json(['error' => "Event type does not exist in trash"], 404);
        }
    }

    public function restoretrashed($eventType)
    {
        $trashed = EventType::onlyTrashed()->where('id',$eventType)->first();
        if($trashed){
            $trashed->restore();
            return response()->json(['message' => 'Event type is successfully restored'], 200);
        } else {
            return response()->json(['error' => "Event type does not exist in trash"], 404);
        }
    }

    public function forcedelete($eventType)
    {
        $trashed = EventType::onlyTrashed()->where('id',$eventType)->first();
        if($trashed){
            $trashed->forceDelete();
            return response()->json(['message' => 'Event type is deleted permanently'], 200);
        } else {
            return response()->json(['error' => "Event type does not exist in trash"], 404);
        }
    }
}
