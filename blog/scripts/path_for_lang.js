"use strict";
hexo.extend.helper.register("path_for_lang", function path_for_lang(lang) {
    var self = this;
    var path = self.switch_lang(lang);
    var index = path.indexOf("index.html");
    if (index !== -1) {
        return path.substring(0, index);
    } else {
        return path;
    }
});
