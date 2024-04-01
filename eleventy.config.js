const pluginWebc = require("@11ty/eleventy-plugin-webc");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const pluginRss = require("@11ty/eleventy-plugin-rss");

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
    config.addPlugin(pluginWebc);
    config.addPlugin(pluginRss);
    config.addPlugin(EleventyHtmlBasePlugin, {
        baseHref: process.env.NODE_ENV === "production" ? "https://www.eniehack.net/~eniehack/monoxa/" : "http://localhost:8080",
    });

    config.addShortcode("date", function () {
      const date = new Date();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${date.getFullYear()}-${month.toString().length !== 2 ? "0"+month.toString() : month.toString() }-${day.toString().length !== 2 ? "0"+day.toString() : day.toString() }`
    });
    config.addShortcode("now", function () {
        return (new Date()).toISOString();
    });
    config.addFilter("toDate", function (str) {
        return new Date(str);
    });
    config.addFilter("sortUpdates", function (arr) {
        return arr.sort((obja, objb) => {
            const a = new Date(obja["updated"])
            console.log(a.getTime())
            const b = new Date(objb["updated"])
            return a.getTime() - b.getTime();
        })
    });
    config.addFilter("reverseUpdates", function (arr) {
        return arr.reverse()
    });
    config.addFilter("dateToRfc3339", pluginRss.dateToRfc3339);

    return {
        dir: {
            input: "src",
            include: "src/_includes",
        },
        htmlTemplateEngine: "njk",
        templateFormats: ["html", "njk", "webc"]
    }
}
