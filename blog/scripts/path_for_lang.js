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
hexo.extend.helper.register("is_same_path", function is_same_path(path1, path2) {
    var self = this;
    var index = path1.indexOf("index.html");
    if (index !== -1) {
        path1 = path1.substring(0, index);
    }
    index = path2.indexOf("index.html");
    if (index !== -1) {
        path2 = path2.substring(0, index);
    }
    return self.url_for(path1) === self.url_for(path2);
});
