<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        if ($intended = session()->pull('intended')) {
            return redirect()->away($intended);
        }

        // TODO auto-redirect to appropriate location post-login
        // If user is linked to multiple tenants, show them a menu to select which one to go to
        // For now we'll just show a screen with a logout button!

        return view('home');
    }
}
