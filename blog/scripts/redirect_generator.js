'use strict';

hexo.extend.generator.register('redirect-generator', function generateRedirects() {
    var config = this.config;
    config.redirects = config.redirects || [];
    return config.redirects.reduce(function (result, redirect) {
        var path = redirect.from;
        var data = redirect_page(redirect.to);
        return result.concat({
            path: path,
            data: data
        })
    }, []);

    function redirect_page(target) {
        return "<!DOCTYPE html>\n" +
            "<html>\n" +
            "\n" +
            "<head>\n" +
            "    <meta charset=\"utf-8\">\n" +
            "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
            "    <title>Redirection to the T3r1jj</title>\n" +
            "    <meta name=\"description\" content=\"T3r1jj\">\n" +
            "    <meta name=\"author\" content=\"T3r1jj\"/>\n" +
            "    <meta http-equiv=\"refresh\" content=\"2;URL='" + target + "'\"/>\n" +
            "    <link href=\"https://fonts.googleapis.com/css?family=Press+Start+2P\"\n" +
            "          rel=\"stylesheet\">\n" +
            "    <style>\n" +
            "        body {\n" +
            "            margin: 0;\n" +
            "            background: #42b983;\n" +
            "        }\n" +
            "\n" +
            "        .circle {\n" +
            "            width: 500px;\n" +
            "            height: 500px;\n" +
            "            border-radius: 50%;\n" +
            "            line-height: 500px;\n" +
            "            text-align: center;\n" +
            "            position: relative;\n" +
            "        }\n" +
            "\n" +
            "        .pixel {\n" +
            "            position: absolute;\n" +
            "            width: 100px;\n" +
            "            height: 100px;\n" +
            "            background: #000;\n" +
            "            z-index: 100;\n" +
            "        }\n" +
            "\n" +
            "        .circle-open {\n" +
            "            top: 50%;\n" +
            "            left: 50%;\n" +
            "            position: absolute;\n" +
            "            width: 0;\n" +
            "            height: 0;\n" +
            "            -webkit-transition: all 2s ease-in-out;\n" +
            "            -moz-transition: all 2s ease-in-out;\n" +
            "            -o-transition: all 2s ease-in-out;\n" +
            "            -ms-transition: all 2s ease-in-out;\n" +
            "            transition: all 2s ease-in-out;\n" +
            "            background: #9400D3;\n" +
            "            border-radius: 100%;\n" +
            "        }\n" +
            "\n" +
            "        .circle.inner {\n" +
            "            background: black;\n" +
            "        }\n" +
            "\n" +
            "        .circle#circle-bg {\n" +
            "            width: 400px;\n" +
            "            height: 400px;\n" +
            "            top: 50px;\n" +
            "            left: 50px;\n" +
            "            background: #42b983;\n" +
            "        }\n" +
            "\n" +
            "        .circle#circle-secondary-bg {\n" +
            "            top: 250px;\n" +
            "            left: 250px;\n" +
            "            width: 0;\n" +
            "            height: 0;\n" +
            "            background: #9400D3;\n" +
            "            position: absolute;\n" +
            "            -webkit-transition: all 0.5s ease-in-out;\n" +
            "            -moz-transition: all 0.5s ease-in-out;\n" +
            "            -o-transition: all 0.5s ease-in-out;\n" +
            "            -ms-transition: all 0.5s ease-in-out;\n" +
            "            transition: all 0.5s ease-in-out;\n" +
            "        }\n" +
            "\n" +
            "        .circle-text {\n" +
            "            top: 0;\n" +
            "            left: 0;\n" +
            "            width: 510px;\n" +
            "            height: 500px;\n" +
            "            position: absolute;\n" +
            "            border: #ffa500 solid 0;\n" +
            "            margin: 0;\n" +
            "            -webkit-transition: all 0.25s ease-in-out;\n" +
            "            -moz-transition: all 0.25s ease-in-out;\n" +
            "            -o-transition: all 0.25s ease-in-out;\n" +
            "            -ms-transition: all 0.25s ease-in-out;\n" +
            "            transition: all 0.25s ease-in-out;\n" +
            "            font-family: 'Press Start 2P', cursive;\n" +
            "        }\n" +
            "\n" +
            "        .animation {\n" +
            "            animation: blink 2s ease-in-out infinite alternate;\n" +
            "        }\n" +
            "\n" +
            "        @keyframes blink {\n" +
            "            100% {\n" +
            "                background: #fff;\n" +
            "                box-shadow: 0 0 25px 5px #fff;\n" +
            "            }\n" +
            "        }\n" +
            "\n" +
            "        .circle-text:hover {\n" +
            "            animation: none;\n" +
            "            border-width: 1px 25px 1px 25px;\n" +
            "            margin: -1px -25px -1px -25px;\n" +
            "            background: #fff;\n" +
            "        }\n" +
            "\n" +
            "        .circle-text:active {\n" +
            "            background: #f1df9c;\n" +
            "        }\n" +
            "\n" +
            "        .outer {\n" +
            "            display: table;\n" +
            "            position: absolute;\n" +
            "            height: 100%;\n" +
            "            width: 100%;\n" +
            "        }\n" +
            "\n" +
            "        .middle {\n" +
            "            display: table-cell;\n" +
            "            vertical-align: middle;\n" +
            "        }\n" +
            "\n" +
            "        .inner {\n" +
            "            margin-left: auto;\n" +
            "            margin-right: auto;\n" +
            "        }\n" +
            "\n" +
            "        .circle-open-container {\n" +
            "            overflow: hidden;\n" +
            "            position: absolute;\n" +
            "            width: 100%;\n" +
            "            height: 100%;\n" +
            "        }\n" +
            "    </style>\n" +
            "</head>\n" +
            "\n" +
            "<body>\n" +
            "<div class=\"outer\">\n" +
            "    <div class=\"circle-open-container\">\n" +
            "        <div id=\"circle-open\" class=\"circle-open\"></div>\n" +
            "    </div>\n" +
            "    <div id=\"container\" class=\"middle\" style=\"z-index: 200\">\n" +
            "        <div id=\"circle\" class=\"inner circle\">\n" +
            "            <div id=\"circle-bg\" class=\"circle\" style=\"z-index: 300\">\n" +
            "            </div>\n" +
            "            <div id=\"circle-secondary-bg\" class=\"circle\" style=\"z-index: 400\">\n" +
            "            </div>\n" +
            "            <svg xmlns=\"http://www.w3.org/2000/svg\" id=\"circle-svg\" class=\"circle circle-text\" style=\"z-index: 500\"\n" +
            "                 onclick=\"window.location.href='" + target + "'\">\n" +
            "                <mask id=\"cutouttext\">\n" +
            "                    <rect class=\"circle-text\" fill=\"white\"></rect>\n" +
            "                    <text x=\"50%\" y=\"55%\" text-anchor=\"middle\" font-size=\"48\">T3r1jj</text>\n" +
            "                </mask>\n" +
            "                <circle cx=\"250\" cy=\"250\" r=\"300\" fill=\"black\" mask=\"url(#cutouttext)\"></circle>\n" +
            "            </svg>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "            <div class=\"pixel\"></div>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</div>\n" +
            "<script>\n" +
            "    function overlayTextBackground() {\n" +
            "        var circle = document.getElementById(\"circle-bg\");\n" +
            "        var overlayCircle = document.getElementById(\"circle-secondary-bg\");\n" +
            "        overlayCircle.style.width = circle.clientWidth + \"px\";\n" +
            "        overlayCircle.style.height = circle.clientHeight + \"px\";\n" +
            "        overlayCircle.style.top = 50 + \"px\";\n" +
            "        overlayCircle.style.left = 50 + \"px\";\n" +
            "    }\n" +
            "\n" +
            "    function overlayBackground() {\n" +
            "        var container = document.getElementById(\"container\");\n" +
            "        var bgCircle = document.getElementById(\"circle-open\");\n" +
            "        size = container.clientHeight > container.clientWidth ? container.clientHeight : container.clientWidth;\n" +
            "        bgCircle.style.top = -(size / 2) + \"px\";\n" +
            "        bgCircle.style.left = -(size / 2) + \"px\";\n" +
            "        bgCircle.style.width = size * 2 + \"px\";\n" +
            "        bgCircle.style.height = size * 2 + \"px\";\n" +
            "    }\n" +
            "\n" +
            "    function initializePixels() {\n" +
            "        var pixels = Array.from(document.getElementsByClassName(\"pixel\"));\n" +
            "        var circle = document.getElementById(\"circle\");\n" +
            "        var radius = 1.5;\n" +
            "        pixels.forEach(function (pixel) {\n" +
            "            function randomPositionCoeff(radius, previousCoeff) {\n" +
            "                radius = radius || 1;\n" +
            "                var number = Math.random();\n" +
            "                if (previousCoeff === undefined || previousCoeff < 0.25 || previousCoeff > 0.75) {\n" +
            "                    return number\n" +
            "                }\n" +
            "                return number < 0.25 / radius || number > 0.75 / radius ? number : randomPositionCoeff(radius, previousCoeff);\n" +
            "            }\n" +
            "\n" +
            "            function randomSizeCoeff(radius) {\n" +
            "                radius = radius || 1;\n" +
            "                var number = Math.random();\n" +
            "                return number > 0.25 ? number : randomSizeCoeff(radius);\n" +
            "            }\n" +
            "\n" +
            "            var width = radius * randomSizeCoeff(radius) * pixel.clientWidth;\n" +
            "            var height = radius * randomSizeCoeff(radius) * pixel.clientHeight;\n" +
            "            pixel.style.width = width + \"px\";\n" +
            "            pixel.style.height = height + \"px\";\n" +
            "            var positionCoeff = randomPositionCoeff(radius);\n" +
            "            var top = (radius * positionCoeff - radius / 2 + 0.5) * (circle.clientHeight - width);\n" +
            "            pixel.style.top = top + \"px\";\n" +
            "            var left = (radius * randomPositionCoeff(radius, positionCoeff) - radius / 2 + 0.5) * (circle.clientWidth - height);\n" +
            "            pixel.style.left = left + \"px\";\n" +
            "            var dy = (circle.clientHeight / 2 - top - height / 2);\n" +
            "            var dx = (circle.clientWidth / 2 - left - width / 2);\n" +
            "            var ddy = (circle.clientHeight / 2);\n" +
            "            var ddx = (circle.clientWidth / 2);\n" +
            "            var distanceCoeff = Math.sqrt(dy * dy + dx * dx) / Math.sqrt(ddy * ddy + ddx * ddx) / radius;\n" +
            "            pixel.style.background = \"#\" + Math.round(distanceCoeff * 2.5) + Math.round(distanceCoeff * 2.5) + Math.round(distanceCoeff * 2.5);\n" +
            "        });\n" +
            "    }\n" +
            "\n" +
            "    function startUXAnimation() {\n" +
            "        document.getElementById(\"circle-svg\").classList.add(\"animation\")\n" +
            "    }\n" +
            "\n" +
            "    initializePixels();\n" +
            "    setTimeout(function () {\n" +
            "        overlayTextBackground();\n" +
            "        overlayBackground();\n" +
            "    }, 500);\n" +
            "    setTimeout(function () {\n" +
            "        startUXAnimation();\n" +
            "    }, 1500);\n" +
            "</script>\n" +
            "</body>\n" +
            "</html>\n"
    }
});
