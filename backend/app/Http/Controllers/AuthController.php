<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //user register function
    public function register(Request $request)
    {
        //validate data
        $validator = Validator::make($request->all(), [
            'UserDetails.*.first_name' => 'required',
            'UserDetails.*.last_name' => 'required',
            'UserDetails.*.email' => 'required',
            'UserDetails.*.password' => 'required',
        ]);
        //if validation fails
        if($validator->fails()){
            return response()->json(['error'=>$validator->errors()->toJson()], 422);
        }
        //if validation pass
        try
        {
            $users = $request->all();
            foreach($users['UserDetails'] as $key => $values){
                User::updateOrCreate(
                    ['email' => $values['email']], //define index to avoid duplicates
                [
                    'first_name' => $values['first_name'],
                    'last_name' => $values['last_name'],
                    'email' => $values['email'],
                    'password' => Hash::make($values['password']),

                ]);
            }
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
                $cookie = cookie('jwt', $token, 60*24); //store token in cookie for 1 day
                return response()->json([
                    'message'=>'login successfully...'
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

}
