const MarkdownIt = require('markdown-it')
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require('slash')
const { slugify } = require('transliteration')
const format = require('date-fns/format')
const get = require("lodash/get")

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  const blogPost = path.resolve('src/templates/blog-post.js')
  const blogPage = path.resolve('src/templates/blog-page.js')
  
  return new Promise((resolve, reject) => {
    // Query for markdown nodes to create pages.
    graphql(`
      {
        allMarkdownRemark(limit: 1000, filter: {
          frontmatter: {
            draft: { ne: true }
          }
        }) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                layout
              }
            }
          }
        }
      }
    `).then(({ errors, data }) => {
      if (errors) {
        console.error(errors)
        return reject(errors)
      }

      let tags = []
      data.allMarkdownRemark.edges.forEach(edge => {
        const slug = get(edge, 'node.fields.slug')
        if (!slug) {
          return
        }

        const { layout } = edge.node.frontmatter
        createPage({
          path: edge.node.fields.slug,
          component: layout === 'post' ? blogPost : blogPage,
          context: {
            slug: edge.node.fields.slug
          }
        })

      })

      resolve()
    })
  })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)

    let slug
    if (node.frontmatter.path) {
      slug = cleanSlashes(node.frontmatter.path)
    } else if (node.frontmatter.title) {
      slug = slugify(node.frontmatter.title)
    } else {
      slug = node.relativePath
    }

    // if (node.frontmatter.layout === 'post') {
    //   slug = [format(node.frontmatter.date, 'YYYY/MM'), slug].join('/') 
    // }

    if (slug) {
      createNodeField({ node, fieldName: 'slug', fieldValue: ensureSlashes(slug) })
    }
  } else if (node.internal.type === 'File') {
    const relativePath = node.relativePath
    createNodeField({ node, fieldName: 'slug', fieldValue: ensureSlashes(relativePath) })
  }
}

function ensureSlashes(slug) {
  if (slug.charAt(0) !== '/') {
    slug = '/' + slug
  }

  if (slug.charAt(slug.length -1) !== '/') {
    slug = slug + '/'
  }

  return slug
}

function cleanSlashes(slug) {
  if (slug.charAt(0) === '/') {
    slug = slug.slice(1)
  }

  if (slug.charAt(slug.length - 1) === '/') {
    slug = slug.slice(0, -1)
  }

  return slug
}

