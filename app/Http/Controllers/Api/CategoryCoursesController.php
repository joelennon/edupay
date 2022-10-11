<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseListResource;
use App\Models\Category;
use App\Models\Course;
use Illuminate\Http\Request;

class CategoryCoursesController extends Controller
{
    private const ITEMS_PER_PAGE = 12;

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, Category $category)
    {
        if ($request->tenant->id !== $category->tenant_id) {
            abort(404);
        }

        if ($query = $request->query('query')) {
            $courses = Course::search($query)
                ->where('tenant_id', $request->tenant->id)
                ->where('category_id', $category->id);
        } else {
            $courses = $category->courses()
                ->orderBy('day');
        }

        return CourseListResource::collection($courses->simplePaginate(self::ITEMS_PER_PAGE));
    }
}
