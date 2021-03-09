<?php

namespace App\Http\Controllers;

use App\Http\Resources\BusinessTypePlansResource;
use App\Model\Plan;
use App\Model\BusinessType;
use App\Model\BusinessTypePlan;
use Illuminate\Http\Request;

class BusinessTypePlanController extends Controller
{
    public function __construct()
    {
        $this->middleware('businesstypeplan', ['only' => ['postUserData']]);
    }

    public function postUserData(Request $request)
    {
        return $request;
    }

    public function index()
    {
        return BusinessTypePlansResource::collection(BusinessTypePlan::all());
    }

    public function store(Request $request)
    {
        $businessTypePlan = BusinessTypePlan::where([
            'plan_id'=> $request->plan_id,
            'business_type_id'=> $request->business_types_id,
        ])->first();

        if(!$businessTypePlan){ 
            $plan = Plan::find($request->plan_id);
            $businessType = BusinessType::find($request->business_type_id);
            $businessType->plans()->attach($plan->id);
            return response(['Plan is set for Business Type'], 200);
        }
    }

    public function getbusinessTypePlans($businesstype){
        return BusinessTypePlansResource::collection(BusinessTypePlan::where('business_type_id', $businesstype)->get());
    }

 
    public function update(Request $request, $businessTypePlan)
    {
        $delete = BusinessTypePlan::where('business_type_id', $businessTypePlan)->get();
        if($delete->isEmpty()){
            foreach ($request->all() as $plan) {
                $BusinessType = BusinessType::find($businessTypePlan);
                $BusinessType->plans()->attach($plan);
            }
            return response()->json(['message'=> 'Business Type and Plan is updated successfully'], 200);
        } else {
            foreach ($delete as $deleted) {
                $deleted->delete();
            }
            foreach ($request->all() as $plan) {
                $BusinessType = BusinessType::find($businessTypePlan);
                $BusinessType->plans()->attach($plan);
            }
            return response()->json(['message'=> 'Business Type and Plan is updated successfully'], 200);
        }
    }

    public function destroy($businessTypePlan)
    {
        $delete = BusinessTypePlan::where('id', $businessTypePlan)->first();
        if($delete){
            $delete->delete();
            return response()->json(['message'=> 'Business Type and Plan is deleted'], 200);
        }else{
            return response()->json(['message'=> 'Business Type and Plan does not exists'], 404);
        }
    }
}
