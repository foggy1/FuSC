// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "page-component---cache-dev-404-page-js": preferDefault(require("/Users/austin/stuff/FuSC/.cache/dev-404-page.js")),
  "page-component---src-templates-blog-post-js": preferDefault(require("/Users/austin/stuff/FuSC/src/templates/blog-post.js")),
  "page-component---src-pages-index-js": preferDefault(require("/Users/austin/stuff/FuSC/src/pages/index.js"))
}

exports.json = {
  "dev-404-page.json": require("/Users/austin/stuff/FuSC/.cache/json/dev-404-page.json"),
  "2017-05-31-i-still-write-about-comics.json": require("/Users/austin/stuff/FuSC/.cache/json/2017-05-31-i-still-write-about-comics.json"),
  "2017-06-07-my-red-sprite-was-my-shit.json": require("/Users/austin/stuff/FuSC/.cache/json/2017-06-07-my-red-sprite-was-my-shit.json"),
  "2017-06-14-a-hollowing.json": require("/Users/austin/stuff/FuSC/.cache/json/2017-06-14-a-hollowing.json"),
  "index.json": require("/Users/austin/stuff/FuSC/.cache/json/index.json")
}

exports.layouts = {
  "index": preferDefault(require("/Users/austin/stuff/FuSC/src/layouts/index"))
}