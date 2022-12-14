<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    function register(Request $request)
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
}
