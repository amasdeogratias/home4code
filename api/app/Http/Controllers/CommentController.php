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

    public function viewComments($taskId)
    {
        $comments = Comment::with('user', 'task')->where('task_id', $taskId)->get();
        return response()->json($comments, 200);

    }

    public function updateComment(Request $request, $commentId)
    {
        try {

            $this->validate($request, [
                'body' => 'required|string|min:3',
            ]);

            $comment = Comment::findOrFail($commentId);
            $comment->body = $request->body;
            $comment->save();
            return response()->json($comment, 200);

        }catch(\Exception $e){
            return response([
                "message" => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($commentId)
    {
        Comment::findOrFail($commentId)->delete();
        return response()->json([], 204);
    }
}
