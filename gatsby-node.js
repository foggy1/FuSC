const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const select = require(`unist-util-select`)
const fs = require(`fs-extra`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const pages = []
    const blogPost = path.resolve("./src/templates/blog-post.js")
    const blogPage = path.resolve("./src/templates/blog-page.js")
    const comic = path.resolve("./src/templates/comic.js")
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
                path
              }
            }
          }
        }
      }
    `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        _.each(result.data.allMarkdownRemark.edges, edge => {
          if (edge.node.frontmatter.layout === 'post') {
            createPage({
              path: edge.node.frontmatter.path, // required
              component: blogPost,
              context: {
                slug: edge.node.fields.slug,
              },
            })  
          } else if (edge.node.frontmatter.layout === 'page') {
            createPage({
              path: edge.node.frontmatter.path, // required
              component: blogPage,
              context: {
                slug: edge.node.fields.slug
              }
            })
          } else if (edge.node.frontmatter.layout === 'comic') {
            createPage({
              path: edge.node.frontmatter.path, // required
              component: comic,
              context: {
                slug: edge.node.fields.slug
              }
            })
          }
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
      const slug = `/${parsedFilePath.dir}/`
      createNodeField({
        node,
        fieldName: 'slug',
        fieldValue: slug
      })
      if (node.frontmatter) {
        createNodeField({
          node,
          fieldName: 'indexImage',
          fieldValue: node.frontmatter.indexImage
        }) 
      }
      return

    case 'MarkdownRemark':
      const fileNode = getNode(node.parent)
      createNodeField({
        node,
        fieldName: 'slug',
        fieldValue: fileNode.fields.slug
      })
      if (node.frontmatter) {
        createNodeField({
          node,
          fieldName: 'indexImage',
          fieldValue: node.frontmatter.indexImage
        })
      }
      return
  }
}
