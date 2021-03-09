<?php

namespace App\Http\Controllers;

use App\Model\Banner;
use App\Model\Business;
use Illuminate\Http\Request;
use App\Http\Resources\BannerResource;

class BannerController extends Controller
{
    public function __construct()
    {
        $this->middleware('businesstypemodule:banner');
        $this->middleware('authbusiness');
    }
    public function index(Business $business)
    {
        return BannerResource::collection($business->banner);
    }

    public function store(BannerRequest $request, Business $business)
    {
        $bannerBusiness = Banner::where("business_id", $business->id)->first();
        $imagePath = "";
        if ($request->hasFile('imagepath')) {
            $file = $request->file('imagepath');
            $path = public_path('/images');
            $imagePath = $file->move($path, $file->getClientOriginalName());
            $imagepath = $file->getClientOriginalName();
        }
        if ($bannerBusiness) {
            $bannerBusiness->imagepath = $imagepath;
            $bannerBusiness->update();
        } else {
            $banner = new Banner();
            $banner->imagepath = $imagepath;
            $business->banner()->save($banner);
            return response([
                'data' => new BannerResource($banner)
            ],201);
        }
    }

    public function update(Request $request, Business $business,  Banner $banner)
    {  
        if ($request->hasFile('imagepath')) {
            $file = $request->file('imagepath');
            $path = public_path('/images');
            $imagePath = $file->move($path, $file->getClientOriginalName());
            $imagepath = $file->getClientOriginalName();
            $banner->imagepath = $imagepath;
            $banner->update();
        }
        return response([
          'data' => new BannerResource($banner)
        ], 201);
    }

    public function destroy(Business $business, Banner $banner)
    {
        if ($business && $banner) {
            $banner->delete();
            return response([
                'data' => 'Banner is deleted'
            ], 201);
        } else {
            return response([
                'data' => 'Banner does not exists'
            ], 401);  
        } 
    }

    public function trashed(Business $business)
    {
        $trashed = Banner::onlyTrashed()->where('business_id', $business->id)->get();
        if($trashed){
            return response()->json($trashed, 200);
        } else {
            return response([
                'data' => 'Banner is deleted'
            ], 201);
        }
    }

    public function restoretrashed(Business $business, $banner)
    {
        $trashed = Banner::onlyTrashed()->where(['business_id'=>$business->id, 'id'=>$banner])->first();
        if($trashed){
            $trashed->restore();
            return response()->json('Banner is successfully restored', 200);
        } else {
            return response()->json("Banner does not exist in trash", 200);
        }
    }

    public function forcedelete(Business $business, $banner)
    {
        $trashed = Banner::onlyTrashed()->where(['business_id'=>$business->id, 'id'=>$banner])->first();
        if($trashed){
            $trashed->forceDelete();
            return response()->json('Banner is deleted', 200);
        } else {
            return response()->json("Banner does not exist in trash", 200);
        }
    }
}
