@extends('_layouts.auth')

@section('content')
<h2>Login</h2>
<form method="post">
    <input name="email" placeholder="Enter your email address" />
    <input type="password" name="password" placeholder="Enter your password" />

    <button>
        Login
    </button>
</form>
@endsection