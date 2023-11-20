<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    AuthController,
    ForgetPasswordController,
    ResetPasswordController,
    TaskController,
    CommentController
};

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/forget_password', [ForgetPasswordController::class, 'forgetPassword']);
Route::post('/reset_password', [ResetPasswordController::class, 'resetPassword']);

Route::group(["middleware" => 'auth:api'], function() {
    Route::get('/login-user', [AuthController::class, 'authUser']);


    Route::resource('tasks', TaskController::class);
    Route::get('/users/all', [TaskController::class, 'getUsers']);
    Route::post('/tasks/assign', [TaskController::class, 'assignTaskToUser']);
    Route::post('/tasks/overdue', [TaskController::class, 'checkOverdueTasks']);

    Route::group(["prefix" => 'comments'], function(){
        Route::post('/add', [CommentController::class, 'store']);
    });
});
