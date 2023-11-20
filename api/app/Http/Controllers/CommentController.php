<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        try {
            $this->validate($request, [
                'task_id' => 'required|integer|exists:tasks,id',
                'user_id' => 'required|integer|exists:users,id',
                'body' => 'required|string|min:3',
            ]);

            $comment = new Comment;
            $comment->task_id = $request->task_id;
            $comment->user_id = $request->user_id;
            $comment->body = $request->body;
            $comment->save();
            return response()->json($comment, 201);

        }catch(\Exception $exception){
            return response([
                "message" => $exception->getMessage()
            ], 500);
        }
    }
}
