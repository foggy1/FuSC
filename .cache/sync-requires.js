// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "page-component---cache-dev-404-page-js": preferDefault(require("/Users/austin/stuff/FuSC/.cache/dev-404-page.js")),
  "page-component---src-templates-blog-post-js": preferDefault(require("/Users/austin/stuff/FuSC/src/templates/blog-post.js")),
  "page-component---src-pages-index-js": preferDefault(require("/Users/austin/stuff/FuSC/src/pages/index.js"))
}

exports.json = {
  "dev-404-page.json": require("/Users/austin/stuff/FuSC/.cache/json/dev-404-page.json"),
  "posts-1.json": require("/Users/austin/stuff/FuSC/.cache/json/posts-1.json"),
  "posts-2.json": require("/Users/austin/stuff/FuSC/.cache/json/posts-2.json"),
  "posts-3.json": require("/Users/austin/stuff/FuSC/.cache/json/posts-3.json"),
  "index.json": require("/Users/austin/stuff/FuSC/.cache/json/index.json")
}

exports.layouts = {
  "index": preferDefault(require("/Users/austin/stuff/FuSC/src/layouts/index"))
}