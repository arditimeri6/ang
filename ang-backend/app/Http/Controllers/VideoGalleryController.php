<?php

namespace App\Http\Controllers;

use App\Model\Module;
use App\Model\Business;
use App\Model\UserBusiness;
use App\Model\VideoGallery;
use Illuminate\Http\Request;
use App\Model\BusinessTypeModule;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ModuleResource;
use App\Http\Requests\VideoGalleryRequest;
use App\Http\Resources\VideoGalleryResource;
use App\Http\Resources\BusinessTypeModuleResource;

class VideoGalleryController extends Controller
{
    public function __construct()
    {
        // $this->middleware('businesstypemodule:videogallery');
        // $this->middleware('authbusiness');
    }
    public function getbusinessesprofilesvideos($slug){
        $business = Business::where('slug', $slug)->first();
        return VideoGalleryResource::collection($business->videogalleries);
        // return new  PlaceResource($place);
    }

    public function index(Business $business)
    {
        return VideoGalleryResource::collection($business->videogalleries);
    }

    public function store(VideoGalleryRequest $request, Business $business)
    {
            $videoGallery = new VideoGallery($request->all());
            $business->videogalleries()->save($videoGallery);
            return response([
                    'message' => 'Item is added successfully',
                    'data' => new VideoGalleryResource($videoGallery)
            ],201);

    }

    public function update(Request $request,  Business $business,  VideoGallery $videogallery)
    {
        $videogallery->update($request->all());
        return response([
            'message' => 'Item is updated successfully',
            'data' => new VideoGalleryResource($videogallery)
        ], 201);
    }

    public function destroy(Business $business, VideoGallery $videogallery)
    {
        if ($business && $videogallery) {
            $videogallery->delete();
            return response([
                'message' =>  'Video Item is deleted'
            ], 201);
        } else {
            return response([
                'error' => 'Video Item does not exists'
            ], 404);  
        } 
    }

    public function trashed(Business $business)
    {
        $trashed = $business->videogalleries()->onlyTrashed()->get();
        if($trashed){
            return VideoGalleryResource::collection($trashed);
        } else {
            return response([
                'message' => 'Video Item is deleted'
            ], 201);
        }
    }

    public function restoretrashed(Business $business, $videogallery)
    {
        $trashed =  $business->videogalleries()->onlyTrashed()->where('id', $videogallery)->first();
        if($trashed){
            $trashed->restore();
            return response()->json(['message'=>'Photo is successfully restored'], 200);
        } else {
            return response()->json(['error'=>"Video does not exist in trash"], 404);
        }
    }

    public function forcedelete(Business $business, $videogallery)
    {
        $trashed =  $business->videogalleries()->onlyTrashed()->where('id', $videogallery)->first();
        if($trashed){
            $trashed->forceDelete();
            return response()->json(['message'=>'Video is deleted permanently'], 200);
        } else {
            return response()->json(['error'=>"Video does not exist in trash"], 404);
        }
    }


}
