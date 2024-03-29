<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    //user register function
    public function register(Request $request)
    {
        //validate data
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);
        //if validation fails
        if($validator->fails()){
            return response()->json(['error'=>$validator->errors()->toJson()], 422);
        }
        //if validation pass
        try
        {
            $users = $request->all();
                User::updateOrCreate(
                    ['email' => $request->email], //define index to avoid duplicates
                [
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),

                ]);

            return response()->json([
                'message'       => 'Users created successfully',
            ], 201);
        }catch(\Exception $e){
            return response()->json(['error'=>$e->getMessage()],500);
        }
    }

    //user login function
    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']); //request only two fields from user table
        //make request validation
        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if($validator->fails()){ //if validator fails return error
            return response()->json(['validation error' => $validator->errors()->toJson()],422);
        }

        try{

            $user = User::where('email', $request->email)->first();

            if($user && Hash::check($request->password, $user->password)){
                //return authentication tokens with cookie

                $token = ($user)->createToken('token')->plainTextToken;
                $cookie = cookie('jwt', $token, 60*24); //store token in cookie valid for 1 day
                return response()->json([
                    'message'=>'user login successfully'
                ])->withCookie($cookie);
            }else {
                return response()->json([
                    'message' => 'Incorrect username or password',
                    'Status'  => 500
                ]);
            }
        }catch(\Exception $e){
            return response()->json(['error'=>'Login failed, Check your username and password and try again'],500);
        }
    }

    //return authenticated user
    public function getAuth()
    {
        return Auth::user();
    }

    //logout function
    public function logout()
    {
        $cookie = Cookie::forget('jwt'); //forget the cookie generated during login
        return response()->json([
            'message' => 'logout successfully'
        ])->withCookie($cookie);
    }

}
