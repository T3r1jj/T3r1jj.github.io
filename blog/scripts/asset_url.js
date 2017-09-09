'use strict';

hexo.extend.helper.register("asset_url", function asset_url(page, item) {
    var self = this;
    if (item.type === "external") {
        return item.url;
    } else if (item.type === "default") {
        return self.url_for(page.path.substring(0, page.path.indexOf("/index.html")).split("/").splice(1).join("/") + item.url)
    } else if (item.type === "source") {
        return self.url_for(item.url);
    } else {
        return self.url_for_lang(page.path.substring(0, page.path.indexOf("/index.html")) + item.url);
    }
});