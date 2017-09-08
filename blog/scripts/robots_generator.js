'use strict';
hexo.extend.generator.register('robots-generator', function generateRobotsTxt() {
    var config = this.config;
    config.robots = config.robots || {};
    config.robots.disallow = config.robots.disallow || [];
    return {
        path: "robots.txt",
        data: "User-agent: *\n" +
        config.robots.disallow.map(function (disallow) {
            return "Disallow: " + disallow
        }).join("\n") +
        "\n" +
        "sitemap: " + config.url + config.sitemap.path
    }
});
