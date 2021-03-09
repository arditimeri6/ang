<?php

namespace App\Http\Controllers;

use App\Model\Module;
use App\Model\Business;
use App\Model\PhotoGallery;
use App\Model\Place;
use Illuminate\Http\Request;
use App\Model\BusinessTypeModule;
use App\Http\Resources\ModuleResource;
use App\Http\Requests\PhotoGalleryRequest;
use App\Http\Resources\PhotoGalleryResource;
use App\Http\Resources\BusinessTypeModuleResource;
use Intervention\Image\ImageManagerStatic as Image;
class PhotoGalleryController extends Controller
{
    public function __construct()
    {
        // $this->middleware('businesstypemodule:photogallery');
        // $this->middleware('authbusiness');
        $this->middleware('photouploadlimit', ['only'=>'store']);
    }
    public function index(Business $business)
    {
        return PhotoGalleryResource::collection($business->photogalleries);
    }
    public function getbusinessesprofilesgalleries($slug){
        $business = Business::where('slug', $slug)->first();
        return PhotoGalleryResource::collection($business->photogalleries);
    }
    public function store(PhotoGalleryRequest $request,  Business $business)
    {

            $photoGallery = new PhotoGallery;
            if ($request->hasFile('imagepath')) {
                $file = $request->file('imagepath');
                $path = public_path('/images');
                $imagePath = $file->move($path, $file->getClientOriginalName());
                $imagepath = $file->getClientOriginalName();
                $photoGallery->imagepath = $imagepath;
            }

            if($request->place_id){
                $place = $business->places->find($request->place_id);
                if($place){
                    $photoGallery->place()->associate($place);
                }
            }
            if($request->banner){
                if($request->banner === 'true'){
                    $photoGallery->feature_banner = 1;
                } else {
                    $photoGallery->feature_banner = 0;
                }
            }
            $business->photogalleries()->save($photoGallery); 
            return response([
                'data' => new PhotoGalleryResource($photoGallery),
                'message' => 'Item is added successfully'
            ],201);

    }

    public function update(Request $request,  Business $business, PhotoGallery $photogallery)
    {
        if ($request->hasFile('imagepath')) {
            $file = $request->file('imagepath');
            $path = public_path('/images');
            $imagePath = $file->move($path, $file->getClientOriginalName());
            $imagepath = $file->getClientOriginalName();
            $photogallery->imagepath = $imagepath;
        }
        if($request->place_id){
            $place = $business->places->find($request->place_id);
            if($place){
                $photogallery->place()->associate($place);
            }
        }
        if($request->banner){
            if($request->banner === 'true'){
                $photogallery->feature_banner = 1;
            } else {
                $photogallery->feature_banner = 0;
            }
        }
        $photogallery->update();
         return response([
           'message' => 'Item is successfully updated',
           'data' => new PhotoGalleryResource($photogallery)
        ], 200);
    }

    public function destroy(Business $business, PhotoGallery $photogallery)
    {
        if ($business && $photogallery) {
            $photogallery->delete();
            return response([
                'message' => 'Photo item is deleted'
            ], 200);
        } else {
            return response([
                'error' => 'Photo does not exists'
            ], 404);
        }
    }

    public function trashed(Business $business)
    {
        $trashed = $business->photogalleries()->onlyTrashed()->get();
        if($trashed){
            return PhotoGalleryResource::collection($trashed);
        } else {
            return response([
                'message' => 'Photo Item is deleted'
            ], 201);
        }
    }

    public function restoretrashed(Business $business, $photogallery)
    {
        $trashed = $business->photogalleries()->onlyTrashed()->where('id', $photogallery)->first();
        if($trashed){
            $trashed->restore();
            return response()->json(['message'=>'Photo is successfully restored'], 200);
        } else {
            return response()->json(['error'=>"Photo does not exist in trash"], 404);
        }
    }

    public function forcedelete(Business $business, $photogallery)
    {
        $trashed = $business->photogalleries()->onlyTrashed()->where('id', $photogallery)->first();
        if($trashed){
            $trashed->forceDelete();
            return response()->json(['message'=>'Photo is deleted permanently'], 200);
        } else {
            return response()->json(['error'=>"Photo does not exist in trash"], 404);
        }
    }
}
