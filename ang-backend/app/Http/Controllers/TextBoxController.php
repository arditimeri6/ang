<?php

namespace App\Http\Controllers;

use App\Model\Module;
use App\Model\TextBox;
use App\Model\Business;
use Illuminate\Http\Request;
use App\Model\BusinessTypeModule;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\TextBoxRequest;
use App\Http\Resources\ModuleResource;
use App\Http\Resources\TextBoxResource;
use App\Http\Resources\BusinessTypeModuleResource;

class TextBoxController extends Controller
{
    public function __construct()
    {
        // $this->middleware('businesstypemodule:textbox');
        // $this->middleware('authbusiness');
    }
    public function index(Business $business)
    {
        return new TextBoxResource($business->textbox);
    }
    public function getbusinessesprofilestext($slug){
        $business = Business::where('slug', $slug)->first();
        return new TextBoxResource($business->textbox);
    }

    public function store(TextBoxRequest $request, Business $business)
    {
        $textBox = $business->textbox;
        if ($textBox) {
            $textBox->title = $request->title;
            $textBox->content = $request->content;
            $textBox->update();
        } else {
            $textBox = new TextBox;
            $textBox->title = $request->title;
            $textBox->content = $request->content;
            $business->textbox()->save($textBox);
        }
        return response([
            'message' => 'Textbox is saved',
            'data' => new TextBoxResource($textBox)
        ],201);
    }

    // public function update(Request $request, Business $business, TextBox $textbox)
    // {
    //     $textbox->update($request->all());
    //     return response([
    //         'data' => new TextBoxResource($textbox)
    //     ], 201);
    // }
    
    // public function destroy(Business $business, TextBox $textbox)
    // {
    //     if ($business && $textbox) {
    //         $textbox->delete();
    //         return response([
    //             'data' => 'Text box is deleted'
    //         ], 201);
    //     } else {
    //         return response([
    //             'data' => 'Text box does not exists'
    //         ], 401);  
    //     } 
    // }

    // public function trashed(Business $business)
    // {
    //     $trashed = TextBox::onlyTrashed()->where('business_id', $business->id)->get();
    //     if($trashed){
    //         return response()->json($trashed, 200);
    //     } else {
    //         return response([
    //             'data' => 'Text box is deleted'
    //         ], 201);
    //     }
    // }

    // public function restoretrashed(Business $business, $textbox)
    // {
    //     $trashed = TextBox::onlyTrashed()->where(['business_id'=>$business->id, 'id'=>$textbox])->first();
    //     if($trashed){
    //         $trashed->restore();
    //         return response()->json('Text box is successfully restored', 200);
    //     } else {
    //         return response()->json("Text box does not exist in trash", 200);
    //     }
    // }

    // public function forcedelete(Business $business, $textbox)
    // {
    //     $trashed = TextBox::onlyTrashed()->where(['business_id'=>$business->id, 'id'=>$textbox])->first();
    //     if($trashed){
    //         $trashed->forceDelete();
    //         return response()->json('Text box is deleted', 200);
    //     } else {
    //         return response()->json("Text box does not exist in trash", 200);
    //     }
    // }
}
