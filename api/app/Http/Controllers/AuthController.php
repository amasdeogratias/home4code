<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use DB;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try{
            if(Auth::attempt($request->only('email', 'password'))) {
                $user = Auth::user();
                $token = $user->createToken('passport')->accessToken;

                return response([
                    'message' => 'Successfully Login',
                    'token' => $token,
                    'user' => $user
                ], 200);
            }

        }catch(Exception $e){
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
        return response()->json([
            'message' => 'Invalid email or password',
        ], 401);
    }


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:55',
            'email' => 'required|unique:users,email|min:5|max:60',
            'password' => 'required|min:6|confirmed'
        ]);

        if($validator->fails()){
            return response(['Validation Error'=>$validator->errors()->toJson()], 422);
        }

        try{
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $token = $user->createToken('passport')->accessToken;

            return response([
                'message' => 'Registration successfully...',
                'token' => $token,
                'user' => $user
            ], 200);

        }catch(Exception $e){
            return response([
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
