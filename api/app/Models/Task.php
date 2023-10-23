<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $table = 'tasks';

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'priority',
        'start_date',
        'duration',
        'end_date',

    ];

    protected $casts = [
        'priority' => 'boolean',
    ];
}