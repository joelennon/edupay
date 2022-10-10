<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Course;
use Illuminate\Http\Request;

class CategoryCoursesController extends Controller
{
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
            return Course::search($query)
                ->where('tenant_id', $request->tenant->id)
                ->where('category_id', $category->id)
                ->simplePaginate(10);
        }

        return $category->courses()->simplePaginate(10);
    }
}
