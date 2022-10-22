<!doctype html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf" content="{{  csrf_token() }}" />
    <title>EduPay</title>
    <link rel="preconnect" href="https://rsms.me/">
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    <script src="https://cdn.tailwindcss.com?plugins=forms"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ["Inter var", ...tailwind.defaultTheme.fontFamily.sans],
                    }
                }
            }
        }
    </script>
</head>

<body>
    @yield('content')
</body>

</html>