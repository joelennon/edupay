<?php

use App\Http\Controllers\Api\CategoriesController;
use App\Http\Controllers\Api\CategoryCoursesController;
use App\Http\Controllers\Api\CoursesController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::apiResource('courses', CoursesController::class);
Route::apiResource('categories', CategoriesController::class);
Route::get('categories/{category}/courses', CategoryCoursesController::class);
