<?php

namespace App\Http\Controllers;

use App\Model\Module;
use Illuminate\Http\Request;
use App\Http\Resources\ModuleResource;
use App\Http\Requests\ModuleRequest;
class ModuleController extends Controller
{

    public function index()
    {
        return ModuleResource::collection(Module::all());
    }

    public function store(ModuleRequest $request)
    {
        $module = new Module;
        $module->title = $request->title;
        $module->save();
        return response([
            'data' => 'Module is created'
        ], 201);
    }

    public function show(Module $module)
    {
        return new ModuleResource($module);
    }

    public function update(Request $request, Module $module)
    {
        $module->update($request->all());
        return response([
            'data' => 'Module is updated',
            'module' => new ModuleResource($module)
        ], 200);
    }

    public function destroy(Module $module)
    {
        if($module){
            $module->delete();
            return response()->json(['message'=> 'Module is deleted'], 200);
        }else{
            return response()->json(['message'=> 'Module does not exists'], 404);
        }
    }

    public function trashed()
    {
        $trashed = ModuleResource::collection(Module::onlyTrashed()->get());
        if($trashed){
            return response()->json($trashed, 200);
        } else {
            return response()->json(['error' => "Module does not exist in trash"], 404);
        }
    }

    public function restoretrashed($module)
    {
        $trashed = Module::onlyTrashed()->where('id',$module)->first();
        if($trashed){
            $trashed->restore();
            return response()->json(['message' => 'Module is successfully restored'], 200);
        } else {
            return response()->json(['error' => "Module does not exist in trash"], 404);
        }
    }

    public function forcedelete($module)
    {
        $trashed = Module::onlyTrashed()->where('id',$module)->first();
        if($trashed){
            $trashed->forceDelete();
            return response()->json(['message' => 'Module is deleted permanently'], 200);
        } else {
            return response()->json(['error' => "Module does not exist in trash"], 404);
        }
    }
}
