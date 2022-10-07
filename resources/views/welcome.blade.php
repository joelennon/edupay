<!doctype html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf" content="{{  csrf_token() }}" />
    <title>EduPay</title>
    <link rel="preconnect" href="https://rsms.me/">
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">

    @viteReactRefresh
    @vite('resources/ts/app.tsx')
</head>

<body class="font-sans antialiased">
    <div id="app" data-user="{{  request()->user() }}"></div>
</body>

</html>