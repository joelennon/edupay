<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class EnrolmentsController extends Controller
{
    public function store(Request $request, Course $course)
    {
        $user = $request->user();
        dd($user);
        $enrolment = $course->enrolments()->attach($user->id);

        return $enrolment;
    }
}
