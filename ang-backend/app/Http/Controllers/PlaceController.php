<?php

namespace App\Http\Controllers;

use App\Model\Place;
use Illuminate\Http\Request;
use App\Model\Business;
use App\Http\Resources\PlaceResource;
use App\Http\Resources\PublicPlaceResource;
use App\Model\Location;
class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Business $business)
    {
        return PlaceResource::collection($business->places);
    }
    public function getbusinessplaces($slug){
        $business = Business::where('slug', $slug)->first();
        return PublicPlaceResource::collection($business->places);
    }

    public function getsinglebusinessprofileplace($slug, $place){
        $business = Business::where('slug', $slug)->first();
        $place = $business->places()->where('slug', $place)->first();
        return new  PublicPlaceResource($place);
    }

    public function store(Request $request, Business $business)
    {
        $place = new Place;
        $place->title = $request->title;
        $place->address = $request->address;
        $place->business()->associate($business); 
        $location = Location::find($request->location_id);
        $location->places()->save($place);
        return response([
            'message' => 'Item is added successfully',
            'data' => new PlaceResource($place)
        ],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Model\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function show(Business $business, Place $place)
    {
        return  new PlaceResource($place);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Model\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function edit(Place $place)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,Business $business, Place $place)
    {
        $place->title = $request->title;
        $place->address = $request->address;
        $location = Location::find($request->location_id);
        $location->places()->save($place);
        return response([
            'message' => 'Item is added successfully',
            'data' => new PlaceResource($place)
        ],201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function destroy(Business $business, Place $place)
    {
        $place->delete();
        return response([
            'message' =>  'Place is deleted'
        ], 201);
 
    }

    public function trashed(Business $business)
    {
        $trashed = $business->places()->onlyTrashed()->get();

            return PlaceResource::collection($trashed);
    
    }

    public function restoretrashed(Business $business, $place)
    {
        $trashed =  $business->places()->onlyTrashed()->where('id', $place)->first();
        if($trashed){
            $trashed->restore();
            return response()->json(['message'=>'Place is successfully restored'], 200);
        } else {
            return response()->json(['error'=>"Place does not exist in trash"], 404);
        }
    }

    public function forcedelete(Business $business, $place)
    {
        $trashed =  $business->places()->onlyTrashed()->where('id', $place)->first();
        if($trashed){
            $trashed->forceDelete();
            return response()->json(['message'=>'Place is deleted permanently'], 200);
        } else {
            return response()->json(['error'=>"Place does not exist in trash"], 404);
        }
    }
}
