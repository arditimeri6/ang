<?php

namespace App\Http\Controllers;

use App\Model\Plan;
use App\Model\BusinessType;
use Illuminate\Http\Request;
use App\Http\Resources\PlanResource;
use App\Http\Requests\PlanRequest;
use App\Model\Business;
use App\Model\BusinessTypePlan;

class PlanController extends Controller
{

    public function index()
    {
        return PlanResource::collection(Plan::all());
    }

    public function getPlans()
    {
        return Plan::select('id', 'title')->get();
    }

    public function getBusinessPlans(Business $business)
    {
        $businessTypePlan = BusinessTypePlan::where('business_type_id', $business->business_type_id)->get()->pluck('plan_id');
        $plans = Plan::whereIn('id', $businessTypePlan)->get();
        return PlanResource::collection($plans);
    }

    public function store(PlanRequest $request)
    {
       $plan = new Plan;
       $plan->title = $request->title;
       $plan->description = $request->description;
       $plan->price = $request->price;
       $plan->active = $request->active;
       $plan->save($request->all());
       return response([
        'message' => 'Item is added successfully',
        'data' => new PlanResource($plan)
        ],200);
    }

    public function update(PlanRequest $request, Plan $plan)
    {
        $plan->title = $request->title;
        $plan->description = $request->description;
        $plan->price = $request->price;
        $plan->active = $request->active;
        $plan->save($request->all());
        return response([
            'message' => 'Item is updated successfully',
            'plan'=> new PlanResource($plan)
        ], 201);
    }

    public function destroy(Plan $plan)
    {
        $plan->delete();
        return response([
            'message' =>  'Item is deleted'
        ], 201);
    }

    public function trashed()
    {
        return PlanResource::collection(Plan::onlyTrashed()->get());
    }

    public function restoretrashed($plan)
    {
        $plan = Plan::onlyTrashed()->where('id', $plan)->first();
        $plan->restore();
        return response()->json(['message'=>'Plan is successfully restored'], 200);

    }

    public function forcedelete($plan)
    {
        $plan = Plan::onlyTrashed()->where('id', $plan)->first();
        $plan->forceDelete();
        return response([
            'message' =>  'Item is deleted permanently'
        ], 201);
    }

    

}
