// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "page-component---cache-dev-404-page-js": preferDefault(require("/Users/austin/stuff/FuSC/.cache/dev-404-page.js")),
  "page-component---src-templates-blog-post-js": preferDefault(require("/Users/austin/stuff/FuSC/src/templates/blog-post.js")),
  "page-component---src-pages-index-jsx": preferDefault(require("/Users/austin/stuff/FuSC/src/pages/index.jsx"))
}

exports.json = {
  "dev-404-page.json": require("/Users/austin/stuff/FuSC/.cache/json/dev-404-page.json"),
  "2017-05-31-i-still-write-about-comics.json": require("/Users/austin/stuff/FuSC/.cache/json/2017-05-31-i-still-write-about-comics.json"),
  "2017-06-07-red-sprite-had-potential.json": require("/Users/austin/stuff/FuSC/.cache/json/2017-06-07-red-sprite-had-potential.json"),
  "2017-06-13-a-hollowing.json": require("/Users/austin/stuff/FuSC/.cache/json/2017-06-13-a-hollowing.json"),
  "about.json": require("/Users/austin/stuff/FuSC/.cache/json/about.json"),
  "contact.json": require("/Users/austin/stuff/FuSC/.cache/json/contact.json"),
  "index.json": require("/Users/austin/stuff/FuSC/.cache/json/index.json")
}

exports.layouts = {
  "index": preferDefault(require("/Users/austin/stuff/FuSC/src/layouts/index"))
}