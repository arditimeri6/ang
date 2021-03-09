<?php

namespace App\Http\Controllers;

use App\Http\Resources\BusinessPreviewResource;
use App\Model\Business;
use App\Model\BusinessType;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Resources\BusinessResource;
use App\Http\Resources\BusinessProfileResource;
use App\Http\Resources\CategorizedBusinessResource;
use App\Http\Resources\SingleBusinessProfileResource;
use App\Model\BusinessTypePlan;
use App\Model\Plan;

class BusinessController extends Controller
{

    public function index()
    {
        return BusinessResource::collection(Business::all());
    }

    public function userBusinesses()
    {
        // $businesses = Auth()->user()->businesses;
        // return BusinessResource::collection($businesses);
        return BusinessResource::collection(Business::all());
    }

    public function show(Business $business)
    {
        return new BusinessResource($business);
    }

    public function update(Business $business, Request $request)
    {
        if ($business) {
            $business->update($request->all());
            return response()->json(['message'=>'Business updated successfully'], 200);
        } else {
            return response()->json(['error'=>'Business not found'], 401);
        }
    }

    public function updateLogo(Request $request, Business $business)
    {
        if ($request->hasFile('logo')) {
            $timestamp = Carbon::now();
            $file = $request->file('logo');
            $path = public_path('/images');
            $name = $timestamp->toDateString() . "-" . $file->getClientOriginalName();
            $asd = $file->move($path, $name);
            $imagepath = $name;
            $business->logo = $imagepath;
        }
    
        $business->update();
        return new BusinessResource($business);
    }

    public function updateStatus(Business $business, Request $status)
    {
        if ($business) {
            $business->status = $status[0];
            $business->update();
            return response()->json(['message'=>'Status changed succesfully'], 200);
        } else {
            return response()->json(['error'=>'Business not found'], 401);
        } 
    }

    public function approveBusiness(Business $business)
    {
        if ($business) {
            $business->approved_at = Carbon::now();
            $business->update();
            return response()->json(['message'=>'Status changed succesfully'], 200);
        } else {
            return response()->json(['error'=>'Business not found'], 401);
        } 
    }
    public function dontApproveBusiness(Business $business, Request $request)
    {
        if ($business) {
            $business->reason = $request->reason;
            $business->update();
            return response()->json(['message'=>'Reason added successfully'], 200);
        } else {
            return response()->json(['error'=>'Business not found'], 401);
        } 
    }

    public function updatePlan(Request $request)
    {
        $business = Business::where('id', $request->business)->first();
        $businessTypePlans = BusinessTypePlan::where('business_type_id', $business->business_type_id)->get()->pluck('plan_id')->toArray();
        if(in_array($request->plan, $businessTypePlans)){
            $business->plan_id = $request->plan;
            $business->update();
            return response()->json(['message' => 'Business Plan is changed successfully'], 200);
        } else {
            return response()->json(['message' => 'Business Plan is does not exist or is not available'], 404);
        }
    }

    public function getSelectedPlan(Business $business)
    {
        return response($business->plan_id);
    }

    public function getbusinessesprofiles(){
        return BusinessProfileResource::collection(Business::all());
    }

    public function getsinglebusinessprofile($slug){
        return new SingleBusinessProfileResource(Business::where('slug', $slug)->first());
    }

    public function categorizedbusiness(){
        return CategorizedBusinessResource::collection(BusinessType::all());
    }

   

    public function destroy(Business $business)
    {
        if($business){
            $business->delete();
            return response()->json(['message'=> 'Business is deleted'], 200);
        }else{
            return response()->json(['message'=> 'Business does not exists'], 404);
        }
    }

    public function trashed()
    {
        $trashed = BusinessResource::collection(Business::onlyTrashed()->get());
        if($trashed){
            return response()->json($trashed, 200);
        } else {
            return response()->json(['error' => "Business does not exist in trash"], 404);
        }
    }

    public function restoretrashed($business)
    {
        $trashed = Business::onlyTrashed()->where('id',$business)->first();
        if($trashed){
            $trashed->restore();
            return response()->json(['message' => 'Business is successfully restored'], 200);
        } else {
            return response()->json(['error' => "Business does not exist in trash"], 404);
        }
    }

    public function forcedelete($business)
    {
        $trashed = Business::onlyTrashed()->where('id',$business)->first();
        if($trashed){
            $trashed->forceDelete();
            return response()->json(['message' => 'Business is deleted permanently'], 200);
        } else {
            return response()->json(['error' => "Business does not exist in trash"], 404);
        }
    }
}
