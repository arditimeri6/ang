<?php

namespace App\Http\Controllers;

use App\Http\Requests\MenuRequest;
use App\Model\Business;
use App\Model\Menu;
use App\Model\Venue;
use Illuminate\Http\Request;

class MenusController extends Controller
{
    public function store(MenuRequest $request)
    {
        $menu = new Menu($request->all());
        $menu->save();
        return response()->json(["Menu is saved" => $menu], 200);
    }

    public function update(MenuRequest $request, Business $business, Venue $venue,  Menu $menu)
    {
        if ($business && $venue && $menu) {
            $menu->name = $request->name;
            $menu->price = $request->price;
            $menu->description = $request->description;
            $menu->venue_id = $request->venue_id;
            $menu->update();
            return response()->json(["Menu is updated" => $menu], 200);
        } else {
            return response([
                'data' => 'Menu does not exists'
            ], 401);  
        } 
    }

    public function destroy(Business $business, Venue $venue, Menu $menu)
    {
        if ($business && $venue && $menu) {
            $menu->delete();
            return response([
                'data' => 'Menu is deleted'
            ], 201);
        } else {
            return response([
                'data' => 'Menu does not exists'
            ], 401);  
        } 
    }

    public function trashed(Business $business, Venue $venue)
    {
        $trashed = Menu::onlyTrashed()->where('venue_id', $venue->id)->get();
        if($trashed){
            return response()->json($trashed, 200);
        } else {
            return response([
                'data' => 'Menu is deleted'
            ], 201);
        }
    }

    public function restoretrashed(Business $business, Venue $venue, $menu)
    {
        $trashed = Menu::onlyTrashed()->where(['venue_id'=>$venue->id, 'id'=>$menu])->first();
        if($trashed){
            $trashed->restore();
            return response()->json('Menu is successfully restored', 200);
        } else {
            return response()->json("Menu does not exist in trash", 200);
        }
    }

    public function forcedelete(Business $business, Venue $venue, $menu)
    {
        $trashed = Menu::onlyTrashed()->where(['venue_id'=>$venue->id, 'id'=>$menu])->first();
        if($trashed){
            $trashed->forceDelete();
            return response()->json('Menu is deleted', 200);
        } else {
            return response()->json("Menu does not exist in trash", 200);
        }
    }
}
