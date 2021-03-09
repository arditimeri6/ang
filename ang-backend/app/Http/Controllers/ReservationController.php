<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationRequest;
use App\Model\Reservation;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    public function store(ReservationRequest $request)
    {
        $date_from = Carbon::parse($request->date_from)->format('Y-m-d H:i:s');
        $date_to = Carbon::parse($request->date_to)->format('Y-m-d H:i:s');

        $this->validateDate($request);

        $reservation = new Reservation;
        $reservation->user_id = Auth::user()->id;
        // $reservation->user_id = 1;
        $reservation->business_id = $request->business_id;
        $reservation->venue_id = $request->venue_id;
        $reservation->date_from = $date_from;
        $reservation->date_to = $date_to;
        $reservation->status = $request->status;
        $reservation->save();
        return response()->json(["Reservation is saved" => $reservation], 200);
    }

    public function update(ReservationRequest $request, Reservation $reservation)
    {
        $date_from = Carbon::parse($request->date_from)->format('Y-m-d H:i:s');
        $date_to = Carbon::parse($request->date_to)->format('Y-m-d H:i:s');
        
        $this->validateDate($request);

        if ($request->has('venue_id')) {
            $reservation->venue_id = $request->venue_id;
        }
        
        $reservation->date_from = $date_from;
        $reservation->date_to = $date_to;
        $reservation->status = $request->status;
        $reservation->update();
        return response()->json(["Reservation is updated" => $reservation], 200);
    }

    public function destroy(Business $business, Reservation $reservation)
    {
        if ($business && $reservation) {
            $reservation->delete();
            return response([
                'data' => 'Reservation is deleted'
            ], 201);
        } else {
            return response([
                'data' => 'Reservation does not exists'
            ], 401);  
        } 
    }

    public function trashed(Business $business)
    {
        $trashed = Reservation::onlyTrashed()->where('business_id', $business->id)->get();
        if($trashed){
            return response()->json($trashed, 200);
        } else {
            return response([
                'data' => 'Reservation is deleted'
            ], 201);
        }
    }

    public function restoretrashed(Business $business, $reservation)
    {
        $trashed = Reservation::onlyTrashed()->where(['business_id'=>$business->id, 'id'=>$reservation])->first();
        if($trashed){
            $trashed->restore();
            return response()->json('Reservation is successfully restored', 200);
        } else {
            return response()->json("Reservation does not exist in trash", 200);
        }
    }

    public function forcedelete(Business $business, $reservation)
    {
        $trashed = Reservation::onlyTrashed()->where(['business_id'=>$business->id, 'id'=>$reservation])->first();
        if($trashed){
            $trashed->forceDelete();
            return response()->json('Reservation is deleted', 200);
        } else {
            return response()->json("Reservation does not exist in trash", 200);
        }
    }

    public function validateDate($request)
    {
        $date_from = Carbon::parse($request->date_from)->format('Y-m-d H:i:s');
        $date_to = Carbon::parse($request->date_to)->format('Y-m-d H:i:s');

        $reservations = Reservation::where(['user_id' => Auth::user()->id, 'business_id' => $request->business_id, 'venue_id' => $request->venue_id])
            ->whereBetween('date_from', [$date_from, $date_to])
            ->orWhereBetween('date_to', [$date_from, $date_to])
            ->get();

        if ($reservations->count() > 0) {
            // Reservation exists
        }
    }
}
