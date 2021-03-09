<?php

namespace App\Http\Controllers;

use App\Model\BusinessType;
use Illuminate\Http\Request;
use App\Http\Resources\BusinessTypeResource;

use App\Http\Requests\BusinessTypeRequest;
class BusinessTypeController extends Controller
{

    public function index()
    {
        return BusinessTypeResource::collection(BusinessType::all());
    }

    public function getTypes()
    {
        return BusinessType::select('id', 'title')->get();
    }

    public function store(BusinessTypeRequest $request)
    {
        $businesstype = new BusinessType;
        $businesstype->title = $request->title;
        $businesstype->save();
        return response([
            'message' => "Business Type is added successfully"
        ], 201);
        return response()->json(['message'=> 'Business Type is added successfully'], 200);
    }

    public function show(BusinessType $businesstype)
    {
        return new BusinessTypeResource($businesstype);
    }

    public function update(Request $request, BusinessType $businesstype)
    {
        $businesstype->update($request->all());
        return response()->json(['message'=> 'Business Type is updated successfully'], 200);
    }

    public function destroy(BusinessType $businesstype)
    {
        if($businesstype){
            $businesstype->delete();
            return response()->json(['message'=> 'Business type is deleted'], 200);
        }else{
            return response()->json(['message'=> 'Business type does not exists'], 404);
        }
    }

    public function trashed()
    {
        $trashed = BusinessTypeResource::collection(BusinessType::onlyTrashed()->get());
        if($trashed){
            return response()->json($trashed, 200);
        } else {
            return response()->json(['error' => "Business type does not exist in trash"], 404);
        }
    }

    public function restoretrashed($event)
    {
        $trashed = BusinessType::onlyTrashed()->where('id',$event)->first();
        if($trashed){
            $trashed->restore();
            return response()->json(['message' => 'Business type is successfully restored'], 200);
        } else {
            return response()->json(['error' => "Business type does not exist in trash"], 404);
        }
    }

    public function forcedelete($event)
    {
        $trashed = BusinessType::onlyTrashed()->where('id',$event)->first();
        if($trashed){
            $trashed->forceDelete();
            return response()->json(['message' => 'Business type is deleted permanently'], 200);
        } else {
            return response()->json(['error' => "Business type does not exist in trash"], 404);
        }
    }
}
