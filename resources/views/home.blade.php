@extends('_layouts.auth')

@section('content')
    <x-forms.form action="/logout">
        <x-button>Logout</x-button>
    </x-forms.form>
@endsection
