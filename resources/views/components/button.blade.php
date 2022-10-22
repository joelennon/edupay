<button type="{{ $type }}" {{ $attributes->merge(['class' => 'inline-flex items-center rounded-md border
    border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700
    focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 '.$class]) }}>
    {{ $slot }}
</button>