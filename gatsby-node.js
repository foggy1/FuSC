const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const select = require(`unist-util-select`)
const fs = require(`fs-extra`)
const get = require('lodash/get')
const { slugify } = require('transliteration')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve("./src/templates/blog-post.js")
    resolve(
      graphql(
        `
      {
        allMarkdownRemark(limit: 1000) {
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
    `
      ).then(({ errors, data }) => {
        if (errors) {
          console.log(errors)
          reject(errors)
        }

        // Create blog posts pages.
        data.allMarkdownRemark.edges.forEach(edge => {
          const slug = get(edge, 'node.fields.slug')
          if (!slug) {
            return
          }
          console.log(edge.node.frontmatter)
          const { layout } = edge.node.frontmatter
          createPage({
            path: edge.node.fields.slug,
            component: blogPost,
            context: {
              slug: edge.node.fields.slug
            }
          })
        })
      })
    )
  })
}

// Add custom slug for blog posts to both File and MarkdownRemark nodes.
exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  switch (node.internal.type) {
    case 'File':
      const parsedFilePath = path.parse(node.relativePath)
      let slug = `/${parsedFilePath.dir}/`
      createNodeField({
        node,
        fieldName: 'slug',
        fieldValue: slug
      })
      return

    case 'MarkdownRemark':
    
      if (node.frontmatter.path) {
        slug = cleanSlashes(node.frontmatter.path)
      } else if (node.frontmatter.title) {
        slug = slugify(node.frontmatter.title)
      } else {
        slug = node.relativePath
      }
      return
  }
}

function ensureSlashes (slug) {
  if (slug.charAt(0) !== '/') {
    slug = '/' + slug
  }

  if (slug.charAt(slug.length -1) !== '/') {
    slug = slug + '/'
  }

  return slug
}

function cleanSlashes (slug) {
  if (slug.charAt(0) === '/') {
    slug = slug.slice(1)
  }

  if (slug.charAt(slug.length - 1) === '/') {
    slug = slug.slice(0, -1)
  }

  return slug
}
