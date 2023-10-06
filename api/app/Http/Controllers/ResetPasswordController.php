<?php

namespace App\Http\Controllers;

use Auth;
use DB;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Validator;
use Illuminate\Http\Request;

class ResetPasswordController extends Controller
{
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
        ]);

        if($validator->fails()){
            return response(['error' => $validator->errors()->toJson()], 422);
        }

        $emailCheck = DB::table('password_reset_tokens')->where('email', $request->email)->first();
        $tokenCheck = DB::table('password_reset_tokens')->where('token', $request->token)->first();

        if(!$emailCheck){
            return response([
                'message' => 'Email not found'
            ], 401);
        }
        if(!$tokenCheck){
            return response([
                'message' => 'Token is Invalid'
            ], 401);
        }

        DB::table('users')->where('email', $request->email)->update(
            [
                'password' => Hash::make($request->password)
            ]);

        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response([
            'message' => 'Password reset successfully...'
        ], 200);
    }
}
