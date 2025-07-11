<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use DB;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Validator;
use App\Events\LoginHistory;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $credentials = $validator->validated();
        

        if(!auth()->attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid email or password',
            ], 401);
        }
        try{
            $user = Auth::user();
            $token = $user->createToken('passport')->accessToken;

            // Log login history event
            event(new LoginHistory($user, $token));

            return response([
                'message' => 'Successfully Login',
                'token' => $token,
                'user' => $user
            ], 200);


        }catch(Exception $e){
            Log::error('Login error', ['error' => $e->getMessage()]);

            return response()->json([
                'message' => 'An error occurred while processing your request.',
            ], 500); // Internal Server Error
        }
        
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

    public function authUser()
    {
        return Auth::user();
    }
}
