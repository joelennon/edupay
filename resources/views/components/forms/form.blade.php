<form method="{{ $method }}" {{ $attributes }} class="space-y-8">
    @csrf
    {{ $slot }}
</form>