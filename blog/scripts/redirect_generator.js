'use strict';
hexo.extend.generator.register('redirect-generator', function generateRedirects() {
    var config = this.config;
    config.redirects = config.redirects || [];
    return config.redirects.reduce(function (result, redirect) {
        var path = redirect.from;
        var data = "<html>\n" +
            "<head>\n" +
            "<title>The webpage has been moved</title>\n" +
            "<meta http-equiv=\"refresh\" content=\"3; URL=" + redirect.to + "\">\n" +
            "<meta name=\"keywords\" content=\"automatic redirection\">\n" +
            "</head>\n" +
            "<body>\n" +
            "If your browser doesn't automatically go there within a few seconds, \n" +
            "you may want to go to \n" +
            "<a href=\"" + redirect.to + "\">the destination</a> \n" +
            "manually.\n" +
            "</body>\n" +
            "</html>";
        return result.concat({
            path: path,
            data: data
        })
    }, []);
});
