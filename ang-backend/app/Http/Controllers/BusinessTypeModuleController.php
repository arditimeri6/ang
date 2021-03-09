<?php

namespace App\Http\Controllers;

use App\Model\BusinessTypeModule;
use App\Model\Module;
use App\Model\BusinessType;
use Illuminate\Http\Request;
use App\Http\Requests\BusinessTypeModuleRequest;
use App\Http\Resources\BusinessTypeModuleResource;

class BusinessTypeModuleController extends Controller
{

    public function index()
    {
        return BusinessTypeModuleResource::collection(BusinessTypeModule::all());
    }

    public function store(BusinessTypeModuleRequest $request)
    {
        $businessTypeModule = BusinessTypeModule::where([
            'module_id'=> $request->module_id,
            'business_type_id'=> $request->business_type_id,
        ])->first();

        if(!$businessTypeModule){
            $module = Module::find($request->module_id);
            $BusinessType = BusinessType::find($request->business_type_id);
            $BusinessType->modules()->attach($module->id);
            return response(['Module is set for Business Type'], 200);
        }
    }

    public function getbusinessTypeModules($businesstype){
        return BusinessTypeModuleResource::collection(BusinessTypeModule::where('business_type_id', $businesstype)->get());
    }

    public function update(Request $request, $businessTypeModule)
    {
        $delete = BusinessTypeModule::where('business_type_id', $businessTypeModule)->get();
        if($delete->isEmpty()){
            foreach ($request->all() as $module) {
                $BusinessType = BusinessType::find($businessTypeModule);
                $BusinessType->modules()->attach($module);
            }
            return response()->json(['message'=> 'Business Type and Module is updated successfully'], 200);
        } else {
            foreach ($delete as $deleted) {
                $deleted->delete();
            }
            foreach ($request->all() as $module) {
                $BusinessType = BusinessType::find($businessTypeModule);
                $BusinessType->modules()->attach($module);
            }
            return response()->json(['message'=> 'Business Type and Module is updated successfully'], 200);
        }
    }

    public function destroy($businessTypeModule)
    {
        $delete = BusinessTypeModule::where('id', $businessTypeModule)->first();
        if($delete){
            $delete->delete();
            return response()->json(['message'=> 'Business Type and Module is deleted'], 200);
        }else{
            return response()->json(['message'=> 'Business Type and Module does not exists'], 404);
        }
    }
}
