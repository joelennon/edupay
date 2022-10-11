<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseListResource;
use App\Http\Resources\CourseShowResource;
use App\Models\Course;
use Illuminate\Http\Request;

class CoursesController extends Controller
{
    private const ITEMS_PER_PAGE = 12;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($query = $request->query('query')) {
            $courses = Course::search($query)
                ->where('tenant_id', $request->tenant->id);
        } else {
            $courses = $request->tenant
                ->courses()
                ->orderBy('day');
        }

        return CourseListResource::collection($courses->simplePaginate(self::ITEMS_PER_PAGE));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Course $course)
    {
        if ($course->tenant_id !== $request->tenant->id) {
            abort(404);
        }

        return new CourseShowResource($course);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
