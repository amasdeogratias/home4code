<?php

namespace App\Http\Controllers;

use App\Models\User;
use Validator;
use Illuminate\Support\Facades\DB;
use Mail;
use App\Mail\ForgetPasswordMail;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ForgetPasswordController extends Controller
{
    public function forgetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
        ]);

        if($validator->fails()){
            return response(['Validation Error' => $validator->errors()->toJson()], 422);
        }

        if(User::where('email', $request->email)->doesntExist()){
            return response([
                'message' => 'Invalid Email entered'
            ], 401);
        }

        $token = rand(10, 100000);

        try{
            DB::table('password_reset_tokens')->insert(
                [
                    'email' => $request->email,
                    'token' => $token,
                    'created_at' => Carbon::now()->toDateTimeString()
                ]
            );

            Mail::to($request->email)->send(new ForgetPasswordMail($token));
            return response()->json([
                'message' => 'Reset Password email sent to your email'
            ],200);

        }catch(\Exception $e){
            return response([
                'Message' => $e->getMessage()
            ],400);
        }
    }
}
