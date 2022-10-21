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
    <style type="text/css">
        /* 
        TODO
        So this is a hot mess really, best thing to do here is probably to handle this in controller.
        For some components we may need lighter variants also for each color. We can use opacity fading
        but it doesn't look right, we'd be better off using 2-3 shades for each color across all
        components. So we may need a `primary-light` and `primary-dark` CSS variable here.
        */
        :root {
            @switch(request()->tenant->color) @case('red') --primary: 220 38 38;
            @break @case('orange') --primary: 234 88 12;
            @break @case('amber') --primary: 217, 119, 6;
            @break @case('yellow') --primary: 202 138 4;
            @break @case('lime') --primary: 101 163 13;
            @break @case('green') --primary: 22 163 74;
            @break @case('emerald') --primary: 5 150 105;
            @break @case('teal') --primary: 13 148 136;
            @break @case('cyan') --primary: 8 145 178;
            @break @case('sky') --primary: 2 132 199;
            @break @case('blue') --primary: 37 99 235;
            @break @case('indigo') --primary: 79 70 229;
            @break @case('violet') --primary: 124 58 237;
            @break @case('purple') --primary: 147 51 234;
            @break @case('fuchsia') --primary: 192 38 211;
            @break @case('pink') --primary: 219 39 119;
            @break @case('rose') --primary: 225 29 72;
            @break @default --primary: 8 145 178;
            @endswitch
        }
    </style>
</head>

<body class="font-sans antialiased bg-gray-100 theme-{{ request()->tenant->color }}">
    <div id="app" data-user="{{  request()->user() }}" data-tenant="{{ request()->tenant }}" }}></div>
</body>

</html>