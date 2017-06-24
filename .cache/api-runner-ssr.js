var plugins = [{
      plugin: require('/Users/austin/stuff/FuSC/node_modules/gatsby-plugin-offline/gatsby-ssr.js'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/austin/stuff/FuSC/node_modules/gatsby-plugin-google-analytics/gatsby-ssr.js'),
      options: {"plugins":[],"trackingId":"UA-80918633-2"},
    },{
      plugin: require('/Users/austin/stuff/FuSC/node_modules/gatsby-plugin-manifest/gatsby-ssr.js'),
      options: {"plugins":[],"name":"Fuck Up Some Comics","short_name":"FuSC","start_url":"/","background_color":"#f7f7f7","theme_color":"#191919","display":"minimal-ui"},
    },{
      plugin: require('/Users/austin/stuff/FuSC/node_modules/gatsby-plugin-sitemap/gatsby-ssr.js'),
      options: {"plugins":[]},
    }]
"use strict";

// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   require('/path/to/plugin1/gatsby-ssr.js'),
//   require('/path/to/plugin2/gatsby-ssr.js'),
// ]

var apis = require(`./api-ssr-docs`);

module.exports = function (api, args, defaultReturn) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api);
  }
  // Run each plugin in series.
  var results = plugins.map(function (plugin) {
    if (plugin.plugin[api]) {
      var result = plugin.plugin[api](args, plugin.options);
      return result;
    }
  }

  // Filter out undefined results.
  );results = results.filter(function (result) {
    return typeof result !== `undefined`;
  });

  if (results.length > 0) {
    return results;
  } else {
    return [defaultReturn];
  }
};
//# sourceMappingURL=api-runner-ssr.js.map