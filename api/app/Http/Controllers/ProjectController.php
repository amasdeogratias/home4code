<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with(['createdBy', 'updatedBy'])->get();
        return response()->json($projects);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'status' => 'required|string|max:255',
            'image_path' => 'required|image|mimes:jpg,png,jpeg|max:2048',
            'created_by' => 'required|exists:users,id',
            'updated_by' => 'required|exists:users,id'
        ]);

        

        try{
            if($request->image_path)
            {
                $file = $request->file('image_path');
                $type = $file->extension();
                $generated_name = $request->name . uniqid() . date("Ymd") . '.' . $type;

                // Move file to storage
                $file->move(public_path('projects'), $generated_name);

                // Set image_path in validated data
                $validated['image_path'] = 'projects/' . $generated_name;
            }
               
            

            $project = Project::create($validated);
            return response([
                'message' => 'Project created successfully...',
                'project' => $project
            ], 200);

        }catch(Exception $e){
            return response([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }
        return response()->json($project->load(['createdBy', 'updatedBy']));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
