<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="{{ mix('css/app.css') }}" rel="stylesheet">
        <title>Shop TransfoAfricaInt</title>
    </head>
    <body>
        {{-- class="min-h-screen flex flex-col" --}}
        <!-- React root DOM -->
        <div id="root" class="min-h-screen flex flex-col justify-between font-inter antialiased relative" >

        </div>

        <!-- React root DOM -->
        <script src="{{ mix('js/app.js') }}" defer></script>
    </body>
</html>
