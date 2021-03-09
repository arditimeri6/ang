<?php

namespace App\Http\Controllers;

use App\Model\Venue;
use Illuminate\Http\Request;
use App\Http\Requests\VenueRequest;
use App\Model\Business;

class VenueController extends Controller
{
    public function store(VenueRequest $request)
    {
        $venue = new Venue($request->all());
        $venue->save();
        return response()->json(["Venue is saved" => $venue], 200);
    }

    public function update(VenueRequest $request, Business $business, Venue $venue)
    {
        if ($business && $venue) {
            $venue->name = $request->name;
            $venue->update();
            return response()->json(["Venue is updated" => $venue], 200);
        } else {
            return response([
                'data' => 'Venue does not exists'
            ], 401);  
        } 
    }

    public function destroy(Business $business, Venue $venue)
    {
        if ($business && $venue) {
            $venue->delete();
            return response([
                'data' => 'Venue is deleted'
            ], 201);
        } else {
            return response([
                'data' => 'Venue does not exists'
            ], 401);  
        } 
    }

    public function trashed(Business $business)
    {
        $trashed = Venue::onlyTrashed()->where('business_id', $business->id)->get();
        if($trashed){
            return response()->json($trashed, 200);
        } else {
            return response([
                'data' => 'Venue is deleted'
            ], 201);
        }
    }

    public function restoretrashed(Business $business, $venue)
    {
        $trashed = Venue::onlyTrashed()->where(['business_id'=>$business->id, 'id'=>$venue])->first();
        if($trashed){
            $trashed->restore();
            return response()->json('Venue is successfully restored', 200);
        } else {
            return response()->json("Venue does not exist in trash", 200);
        }
    }

    public function forcedelete(Business $business, $venue)
    {
        $trashed = Venue::onlyTrashed()->where(['business_id'=>$business->id, 'id'=>$venue])->first();
        if($trashed){
            $trashed->forceDelete();
            return response()->json('Venue is deleted', 200);
        } else {
            return response()->json("Venue does not exist in trash", 200);
        }
    }
}
