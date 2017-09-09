'use strict';
hexo.extend.generator.register('robots-generator', function generateRobotsTxt() {
    var config = this.config;
    config.robots = config.robots || {};
    config.robots.disallow = config.robots.disallow || [];
    config.redirects = config.redirects || [];
    return {
        path: "robots.txt",
        data: "User-agent: *\n" +
        config.robots.disallow.map(function (disallow) {
            return "Disallow: " + disallow
        }).join("\n") +
        config.redirects.map(function (redirect) {
            return "\n" + "Disallow: " + redirect.from
        }).join("") +
        "\n" +
        "sitemap: " + config.sitemap.path
    }
});
