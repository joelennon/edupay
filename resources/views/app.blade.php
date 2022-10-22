<!doctype html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf" content="{{ csrf_token() }}" />
    <title>{{ $tenant->name }} | Powered by EduPay</title>
    <link rel="preconnect" href="https://rsms.me/">
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    @viteReactRefresh
    @vite('resources/ts/app.tsx')
    <style type="text/css">
        /* Might need to add a light variant here too */
        :root {
            --primary: {{ $color }};
        }
    </style>
</head>

<body class="font-sans antialiased bg-gray-100 theme-{{ $tenant->color }}">
    <div id="app" @if ($user) data-user="{{ json_encode($user) }}" @endif
        data-tenant="{{ $tenant }}" }}></div>
</body>

</html>
