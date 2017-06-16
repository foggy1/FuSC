var fs = require('fs-extra-promise') //install this package
var sm = require('sitemap') // install this package
const rucksack = require('rucksack-css')
const lost = require('lost')
const cssnext = require('postcss-cssnext')
const Feed = require('feed')
const moment = require('moment')
const MarkdownIt = require('markdown-it')
const frontmatter = require('front-matter')

var md = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

exports.modifyWebpackConfig = function (config) {
  config.merge({
    postcss: [
      lost(),
      rucksack(),
      cssnext({
        browsers: ['>1%', 'last 2 versions']
      })
    ]
  })

  config.loader('svg', {
    test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
  })

  return config
}

function pagesToSitemap (pages) {
  var urls = pages.map(function(p) {
    if (p.path !== undefined) {
      return {
        url: p.path,
        changefreq: 'daily',
        priority: 0.7
      }
    }
  })
  // remove undefined (template pages)
  return urls.filter(function(u) { return u !== undefined})
}

function generateSiteMap (pages) {
  var sitemap = sm.createSitemap({
    hostname: 'http://fuckupsomecomics.com',
    cacheTime: '60000',
    urls: pagesToSitemap(pages)
  })
  console.log('Generating sitemap.xml')
  fs.writeFileSync(
    `${__dirname}/public/sitemap.xml`,
    sitemap.toString()
  )
}

function generatePosts (posts) {
  var articles = posts.filter(function (p) { return p.data.date })
  console.log('Generating Feeds')
  var feed = new Feed({
    title: 'Fuck Up Some Comics',
    description: 'One more blog about story pictures',
    id: 'http://fuckupsomecomics.com/',
    link: 'http://fuckupsomecomics.com/',
    image: 'https://ih0.redbubble.net/image.218095360.8037/st%2Csmall%2C215x235-pad%2C210x230%2Cf8f8f8.lite-1u2.jpg',
    copyright: 'All rights reserved 2017, Austin Lanari',

    author: {
      name: 'Austin Lanari',
      email: 'foggyboi@notarealemail.com',
      link: 'https://twitter.com/austinlanari'
    }
  })
  articles.forEach(function (a) {
    feed.addItem({
      title: a.data.title,
      id: 'http://fuckupsomecomics.com' + a.data.path,
      link: 'http://fuckupsomecomics.com' + a.data.path,
      description: a.data.description,
      author: {
        name: 'Austin Lanari',
        email: 'foggyboi@notarealemail.com',
        link: 'https://twitter.com/austinlanari'
      },
      date: moment(a.data.date).toDate(),
      image: a.data.indexImage,
      content: md.render(
        frontmatter(
          fs.readFileSync(
            `${__dirname}/pages/${a.requirePath}`,
            'utf-8'
          )
        ).body
      )
    })
  })
  feed.addCategory('comics')
  feed.addCategory('manga')
  var rss = feed.rss2()
  var atom = feed.atom1()
  fs.writeFileSync(
    `${__dirname}/public/rss.xml`,
    rss.toString()
  )
  fs.writeFileSync(
    `${__dirname}/public/atom.xml`,
    atom.toString()
  )
}

module.exports.postBuild = function (pages, callback) {
  generateSiteMap(pages)
  generatePosts(pages)
  callback()
}
