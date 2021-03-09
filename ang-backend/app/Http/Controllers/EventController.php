<?php

namespace App\Http\Controllers;

use App\Model\Event;
use Illuminate\Http\Request;
use App\Http\Requests\EventRequest;
use App\Http\Resources\EventResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $events = auth()->user()->events;
        return EventResource::collection($events);
    }

    public function store(EventRequest $request)
    {
               $date = Carbon::parse($request->date)->format('Y-m-d');
               $event = new Event;
               $event->date = $date;
               $event->title = $request->title;
               auth()->user()->events()->save($event);
               return response([
                'data' => 'Event is created',
                'event' => new EventResource($event)
             ],201); 
    }


    public function show(Event $event)
    {
        return new EventResource($event);
    }


    public function update(Request $request, Event $event)
    {
        $date = Carbon::parse($request->date)->format('Y-m-d');
        $event->date = $date;
        $event->title = $request->title;
        $event->update();
        return response([
            'data' => 'Event is updated',
            'event' => new EventResource($event)
         ],200); 
    }

    public function destroy(Event $event)
    {
        $event->delete();
        return response([
            'data' => 'Event is deleted',
         ],200); 
    }

    public function trashed()
    {
        $trashed = auth()->user()->events()->onlyTrashed()->get();
        if($trashed){
            return EventResource::collection($trashed);
        } else {
            return response()->json(['error' => "Event does not exist in trash"], 404);
        }
    }

    public function restoretrashed($event)
    {
        $trashed = Event::onlyTrashed()->where('id',$event)->first();
        if($trashed){
            $trashed->restore();
            return response()->json(['data' => 'Event is successfully restored'], 200);
        } else {
            return response()->json(['error' => "Event does not exist in trash"], 404);
        }
    }

    public function forcedelete($event)
    {
        $trashed = Event::onlyTrashed()->where('id',$event)->first();
        if($trashed){
            $trashed->forceDelete();
            return response()->json(['data' => 'Event is deleted permanently'], 200);
        } else {
            return response()->json(['error' => "Event does not exist in trash"], 404);
        }
    }
}
