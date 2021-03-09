<?php

namespace App\Http\Controllers;
use App\Http\Requests\VerifyEmailRequest;
use App\Http\Requests\UserConfirmationRequest;
use App\Http\Requests\SignUpRequest;
use App\Http\Requests\BusinesSignUpRequest;
use App\Http\Requests\BusinessMemberRequest;
use App\Http\Requests\VerifyRequest;
use App\Model\Business;
use App\Model\BusinessType;
use App\Model\Plan;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\BusinessSignUpRequest;
use App\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Model\UserBusiness;
use App\Jobs\SendVerificationMailJob;
use Illuminate\Http\Request;
use App\Model\Invitation;
use App\Model\Location;
use App\Model\Place;
class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['only' => ['me']]);
        $this->middleware('checkauthbusinessregister', ['only'=>'business','registerValidation']);
        $this->middleware('checkvalidconfirmcode', ['only'=>'confirmRegistration']);
        $this->middleware('throttle:3,3,1440', ['only'=>['confirmRegistration']]);
        $this->middleware('checkuserinvitationvalid', ['only'=>['checkInvitation','registerBusinessMember']]);
    }

    public function sendVerificationEmail(VerifyEmailRequest $request){

        $verification_code = mt_rand(1000, 9999);
        $expired_time = now()->addMinutes(60);
        $checkuser = DB::table('user_verifications')->where('email', $request->email)->first();
        if(!$checkuser){
           DB::table('user_verifications')->insert(['email'=>$request->email,'verify_token'=>$verification_code, 'expired_at' => $expired_time]);
        } else {
           DB::table('user_verifications')->where('email', $checkuser->email)->update(['verify_token'=>$verification_code, 'expired_at' => $expired_time]);
        }
       $this->sendConfirmationMail($request->email, $verification_code);
       return response()->json(['data'=>'Check your email box'], 200);
   }

   public function sendConfirmationMail($mail, $verification_code)
   {
       SendVerificationMailJob::dispatch($mail, $verification_code);
   }

   public function confirmRegistration(UserConfirmationRequest $request)
   {
       $verification_token = str_random(60);
       $expired_time = now()->addMinutes(60);
       $checkuser = DB::table('user_verifications')->where('email', $request->email)->first();
       if(!$checkuser){
            DB::table('user_token')->insert(['email'=>$request->email,'verify_token'=>$verification_token, 'expired_at' => $expired_time]);
        } else {
            DB::table('user_token')->where('email', $checkuser->email)->update(['verify_token'=>$verification_token, 'expired_at' => $expired_time]);
        }
       return response()->json(['verify_token'=>$verification_token], 201);
   }

   public function registerValidation(Request $request){
    return response()->json(['data'=>'Valid'], 200);
   }
    public function login()
    {
        $credentials = request(['email', 'password']);
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    }

    public function signup(SignUpRequest $request)
    {  
        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->save();
        return $this->login();
    }
    
    public function business(Request $request)
    {   
        $user = User::where('email', $request->email)->first();

        if(!$user){
            $user = new User;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = $request->password;
            $user->save();
            $user->assignRole('User');
        }

        $business = new Business;
        $business->title = $request->title;
        $business->slug = str_slug($request->title);
        $businessType = BusinessType::find($request->business_type_id);
        $businessType->businesses()->save($business);
        $user->businesses()->attach($business);
        
        $userBusiness = UserBusiness::where(['user_id' => $user->id, 'business_id' => $business->id])->first();
        $userBusiness->assignRole("Admin");

        $location = Location::find($request->location_id);
        
        $place = new Place;
        $place->title = $request->title;
        $place->slug = str_slug($request->title);
        $place->business()->associate($business); 
        $location->places()->save($place);

        if (!Auth::user()) {
            $dbRowToDelete =  DB::table('user_token')->where([
                'email'=> $request->email,
                'verify_token'=> $request->verify_token
            ])->delete();
            return [
                'token' => $this->login(),
                'business' => $business->id
            ];
        } else {
            return response()->json(['message'=>'Business is created successfully'], 201);
        }
    }

    public function checkInvitation(Request $request){
        return $request->all();
    }

    public function registerBusinessMember(BusinessMemberRequest $request){
        $business = Business::where('title', $request->title)->first();
        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->save();
        $user->business()->attach($business);
        $invitation = Invitation::where([
            'email' => $request->email,
            'business_id' => $business->id,
            'verify_token' => $request->verify_token
        ])->first();
        $invitation->delete();
        return $this->login();
    }

    public function me()
    {
        return response()->json(auth()->user());
    }



    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }


    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }


    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
        ]);
    }
}