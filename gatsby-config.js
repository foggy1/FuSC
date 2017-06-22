const lost = require(`lost`)

module.exports = {
  siteMetadata: {
    title: `Fuck Up Some Comics`,
    description: `Just another blog about story pictures`,
    site_url: 'https://fuckupsomecomics.com',
    author: 'Foggy',
    twitter: `https://www.twitter.com/austinlanari`,
    github: `https://www.github.com/foggy1`,
    rss: `http://fuckupsomecomics.com/rss.xml`,
    atom: `http://fuckupsomecomics.com/atom.xml`
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
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    // This plugin sets up Google Analytics for you.
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: `UA-80918633-2`
    }
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Fuck Up Some Comics`,
      short_name: `FuSC`,
      start_url: `/`,
      background_color: `#f7f7f7`,
      theme_color: `#191919`,
      display: `minimal-ui`
    }
  },
  {
    resolve: `gatsby-plugin-postcss-sass`,
    options: {
      postCssPlugins: [lost()]
    }
  },
  {
    resolve: 'gatsby-plugin-feed',
    options: {
      query: `
        {
          site {
            siteMetadata {
              title
              description
              site_url
            }
          }
        }
      `,
      feeds: [
        {
          query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
                filter: {
                  frontmatter: { draft: { ne: true } },
                  fileAbsolutePath: { regex: "/posts/" }
                },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    frontmatter {
                      title
                      date
                    }
                    fields {
                      slug
                    }
                  }
                }
              }
            }
          `,
          output: '/rss.xml'
        }
      ]
    }
  },
  {
    resolve: `gatsby-plugin-sitemap`
  }
  ]
}
