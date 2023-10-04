<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use DB;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

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
}
