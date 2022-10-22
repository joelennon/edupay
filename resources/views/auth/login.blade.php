@extends('_layouts.auth')

@section('content')
    <div class="w-screen h-screen flex my-8 md:my-0 md:items-center justify-center">
        <div class="max-w-sm w-full mx-8 md:mx-0">
            <x-page-header class="mb-8">Login to EduPay</x-page-header>
            <x-forms.form method="post">

                <x-forms.input type="email" name="email" id="email" label="Email address"
                    placeholder="Enter your email address" required autofocus />
                <x-forms.input type="password" name="password" id="password" label="Password"
                    placeholder="Enter your password" required />

                <x-button>
                    Login
                </x-button>
            </x-forms.form>
        </div>
    </div>
@endsection
