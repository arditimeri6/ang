<?php

namespace App\Http\Controllers;

use App\Model\Location;
use Illuminate\Http\Request;
use App\Http\Resources\LocationResource;
use App\Http\Requests\LocationRequest;
class LocationController extends Controller
{

    public function index()
    {
        return LocationResource::collection(Location::all());
    }

    public function store(LocationRequest $request)
    {
        $location = new Location;
        $location->title = $request->title;
        $location->save($request->all());
        return response(['data' => 'Location is created'], 201);
    }

    public function update(LocationRequest $request, Location $location)
    {
        $location->title = $request->title;
        $location->update($request->all());
        return response(['data' => 'Location is updated',
                         'location'=> new LocationResource($location)
                        ], 200);
    }

    public function destroy(Location $location)
    {
        $location->delete();
        return response(['data' => 'Location is Deleted'], 200);
    }
}
