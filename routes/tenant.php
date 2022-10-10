<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/{path?}', function () {
    if (auth()->guest()) {
        auth()->login(User::first(), true);
    }

    return view('welcome');
})->where('path', '.*');
