<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Validator;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {

        return Task::all();
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
                'priority' => $request->priority,
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
}
