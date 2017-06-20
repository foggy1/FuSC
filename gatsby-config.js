module.exports = {
  siteMetadata: {
    title: `Fuck Up Some Comics`,
    description: `Fuck up some comics, yeah`,
    author: 'Foggy',
    twitter: `https://www.twitter.com/austinlanari`,
    github: `https://www.github.com/foggy1`,
    rss: `http://fuckupsomecomics.com/rss.xml`,
    atom: `http://fuckupsomecomics.com/atom.xml`,
    googleAnalytics: `UA-80918633-2`
  },
  plugins: [{
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `pages`,
      path: `${__dirname}/src/pages/`
    }
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-responsive-image`,
          options: {
            maxWidth: 690
          }
        },
        {
          resolve: `gatsby-remark-responsive-iframe`
        },
        `gatsby-remark-prismjs`,
        `gatsby-remark-copy-linked-files`,
        `gatsby-remark-smartypants`
      ]
    }
  },
    `gatsby-plugin-sharp`
  ]
}

const path = require('path')

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  let slug
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)
    if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
    } else if (parsedFilePath.dir === ``) {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    // Add slug as a field on the node.
    createNodeField({ node, fieldName: `slug`, fieldValue: slug })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const pages = []
    const blogPost = path.resolve("src/templates/blog-post.js")
    // Query for all markdown "nodes" and for the slug we previously created.
    resolve(
      graphql(
        `
        {
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
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
        result.data.allMarkdownRemark.edges.forEach(edge => {
          createPage({
            path: edge.node.fields.slug, // required
            component: blogPost,
            context: {
              slug: edge.node.fields.slug,
            },
          })
        })

        return
      })
    )
  })
}

