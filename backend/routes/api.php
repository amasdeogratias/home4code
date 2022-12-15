<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/**
 * public routes
 * user is not authenticated
 */
Route::group(['prefix'=> 'auth'], function(){
    Route::post('/register', [\App\Http\Controllers\AuthController::class,'register'])->name('register');
    Route::post('/login', [\App\Http\Controllers\AuthController::class,'login'])->name('login');
});

/**
 * when user is authenticated
 * user sanctum middleware
 */
Route::middleware('auth:sanctum')->group(function(){
    Route::get('user',[\App\Http\Controllers\AuthController::class,'getAuth']);
    Route::post('logout',[\App\Http\Controllers\AuthController::class,'logout']);
});
