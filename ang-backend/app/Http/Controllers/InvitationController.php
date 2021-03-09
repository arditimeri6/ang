<?php

namespace App\Http\Controllers;
use App\User;
use App\Model\Invitation;
use Illuminate\Http\Request;
use App\Http\Requests\VerifyRequest;
use App\Model\Business;
use App\Notifications\InviteUser;
use App\Jobs\SendInvitationMailJob;
use Illuminate\Support\Facades\DB;
use App\Model\Notification;
class InvitationController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth:api');
        // $this->middleware('authbusiness');
    }

    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(VerifyRequest $request, Business $business)
    {
        // return response($request->all());
        foreach ($request->all() as $email) {
            $invitation_token = str_random(60);
            $expired_time = now()->addMinutes(60);
            $user = User::where('email', $email)->first();
            if($user){

                $notification = new Notification;
                $notification->data = $business->title .' invite you to join on their team';
                $notification->type = 'Invitation';
                $notification->business()->associate($business);
                $notification->verify_token = $invitation_token;
                $notification->expired_at = $expired_time;
                $user->notifications()->save($notification);
            } else {
                $ifinvitationexist = Invitation::where(['email' => $email, 'business_id'=>$business->id])->first();
                if($ifinvitationexist){
                    $ifinvitationexist->verify_token = $invitation_token;
                    $ifinvitationexist->expired_at = $expired_time;
                    $ifinvitationexist->update();
                } else {
                    $invitation = new Invitation;
                    $invitation->email = $email;
                    $invitation->verify_token = $invitation_token;
                    $invitation->expired_at = $expired_time;
                    $business->invitations()->save($invitation);
                }

                $this->sendInvitationMail($business->title, $email, $invitation_token);
            }
        }
        return response()->json(['data'=>'Invitations has been sent.'], 200);
    }

    public function sendInvitationMail($business, $email, $invitation_token)
    {
            SendInvitationMailJob::dispatch($business, $email,  $invitation_token);
    }

    // public function acceptInvitation(VerifyRequest $request, Business $business, Invitation $invitation){
    
    // }

    public function update(Request $request, Invitation $invitation)
    {
        
    }


    public function destroy(Business $business, Invitation $invitation)
    {
        $invitation->delete();
        return response(['data' => 'Invitation is Deleted'], 200);
    }
}
