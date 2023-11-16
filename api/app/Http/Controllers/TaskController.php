<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = DB::table('tasks')->join('users', 'tasks.user_id', '=', 'users.id')->get(['tasks.*', 'users.name']);
        return response()->json($tasks);
    }

    public function getUsers()
    {
        return User::all();
    }



    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'title' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        if($validator->fails()){
            return response(['Validation Error' => $validator->errors()->toJson()], 422);
        }

        try {

            $task = Task::create([
                'user_id' => $request->user_id,
                'title' => $request->title,
                'description' => $request->description,
                'priority' => ($request->priority=='on') ? 1 : 0,
                'status' => 'In Progress',
                'start_date' => $request->start_date,
                'duration' => $request->duration,
                'end_date' => $request->end_date,
            ]);

            return response([
                'message' => 'Task created successfully...'
            ],200);

        } catch(\Exception $e) {
            return response([
                'message' => $e->getMessage()
            ],500);
        }
    }

    public function show($id)
    {
        $task = Task::with('user')->find($id);
        return response()->json($task);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'title' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        if($validator->fails()){
            return response(['Validation Error' => $validator->errors()->toJson()], 422);
        }

        $task = Task::find($id);
        try {
            if(!$task){
                return response([
                    'message' => "This task is not in the our records"
                ],500);
            }
            $task->user_id = $request->user_id;
            $task->title = $request->title;
            $task->description = $request->description;
            $task->priority = $request->priority;
            $task->start_date = $request->start_date;
            $task->duration = $request->duration;
            $task->end_date = $request->end_date;
            $task->save();

            return response([
                'message' => "Task updated successfully"
            ],200);

        }catch(\Exception $e){
            return response([
                'message' => $e->getMessage()
            ],500);
        }
    }

    //delete task
    public function destroy($id)
    {
        $task = Task::find($id);
        $task->delete();
        return response([
            'message' => "Task updated successfully"
        ],200);
    }


    public function assignTaskToUser(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'task_id' => 'required',
            'user_id' => 'required'
        ]);

        if($validator->fails()) {
            return response(["Validation Error" => $validator->errors()->toJson()], 422);
        }

        $user = User::find($request->user_id);
        $task = Task::find($request->task_id);

        try{
            $task->user()->associate($user);
            $task->save();
            return response([
                "message" => "Task assigned successfully"
            ], 200);

        }catch(\Exception $e){
            return response([
                "Error" => 'Error in assigning task to user'. $e->getMessage()
            ], 500);
        }
    }
}
