// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "page-component---cache-dev-404-page-js": preferDefault(require("/home/austin/FuSC/.cache/dev-404-page.js")),
  "page-component---src-templates-blog-post-js": preferDefault(require("/home/austin/FuSC/src/templates/blog-post.js")),
  "page-component---src-pages-index-jsx": preferDefault(require("/home/austin/FuSC/src/pages/index.jsx"))
}

exports.json = {
  "dev-404-page.json": require("/home/austin/FuSC/.cache/json/dev-404-page.json"),
  "404.json": require("/home/austin/FuSC/.cache/json/404.json"),
  "posts-2.json": require("/home/austin/FuSC/.cache/json/posts-2.json"),
  "posts-1.json": require("/home/austin/FuSC/.cache/json/posts-1.json"),
  "posts-3.json": require("/home/austin/FuSC/.cache/json/posts-3.json"),
  "about.json": require("/home/austin/FuSC/.cache/json/about.json"),
  "contact.json": require("/home/austin/FuSC/.cache/json/contact.json"),
  "index.json": require("/home/austin/FuSC/.cache/json/index.json"),
  "404-html.json": require("/home/austin/FuSC/.cache/json/404-html.json")
}

exports.layouts = {
  "index": preferDefault(require("/home/austin/FuSC/src/layouts/index"))
}