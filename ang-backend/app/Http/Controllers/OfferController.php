<?php

namespace App\Http\Controllers;

use App\Model\Offer;
use App\Model\Module;
use App\Model\Business;
use App\Model\UserBusiness;
use App\Model\BusinessTypeModule;
use App\Http\Requests\OfferRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\OfferResource;
use App\Http\Resources\ModuleResource;
use App\Http\Resources\BusinessTypeModuleResource;

class OfferController extends Controller
{
    public function __construct()
    {
        $this->middleware('businesstypemodule:offerts');
        $this->middleware('authbusiness');
    }

    public function index(Business $business)
    {
        return OfferResource::collection($business->offerts);
    }

    public function store(OfferRequest $request, Business $business)
    {

            $offer = new Offer($request->all());
            $business->offers()->save($offer);
            return response([
                'data' => new OfferResource($offer)
            ],201);
    }

    public function update(OfferRequest $request, Business $business, Offer $offer)
    {
        $offer->update($request->all());
        return response([
            'data' => new OfferResource($offer),
            'response'=> 'Offer is Updated'
        ],200);
    }

    public function destroy(Business $business, Offer $offer)
    {
        if ($business && $offer) {
            $offer->delete();
            return response([
                'data' => 'Offer is deleted'
            ], 201);
        } else {
            return response([
                'data' => 'Offer does not exists'
            ], 401);  
        } 
    }

    public function trashed(Business $business)
    {
        $trashed = Offer::onlyTrashed()->where('business_id', $business->id)->get();
        if($trashed){
            return response()->json($trashed, 200);
        } else {
            return response([
                'data' => 'Offer is deleted'
            ], 201);
        }
    }

    public function restoretrashed(Business $business, $offer)
    {
        $trashed = Offer::onlyTrashed()->where(['business_id'=>$business->id, 'id'=>$offer])->first();
        if($trashed){
            $trashed->restore();
            return response()->json('Offer is successfully restored', 200);
        } else {
            return response()->json("Offer does not exist in trash", 200);
        }
    }

    public function forcedelete(Business $business, $offer)
    {
        $trashed = Offer::onlyTrashed()->where(['business_id'=>$business->id, 'id'=>$offer])->first();
        if($trashed){
            $trashed->forceDelete();
            return response()->json('Offer is deleted', 200);
        } else {
            return response()->json("Offer does not exist in trash", 200);
        }
    }
    
}
