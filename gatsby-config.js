module.exports = {
  siteMetadata: {
    title: "Fuck Up Some Comics",
    author: "Austin Lanari",
    siteUrl: "https://fuckupsomecomics.com"
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Fuck Up Some Comics`,
        short_name: `FuSC`,
        start_url: `/`,
        background_color: `#039be5`,
        theme_color: `#63ccff`,
        display: `standalone`,
        icons: [
          {
            src: `/favicons/favicon-32x32.ico`,
            sizes: `32x32`,
            type: `image/png`
          },
          {
            src: `/favicons/favicon-144x144.ico`,
            sizes: `144x144`,
            type: `image/png`
          },
          {
            src: `/favicons/favicon-192x192.ico`,
            sizes: `192x192`,
            type: `image/png`
          }
        ]
      }
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
        ],
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-80918633-2`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-sitemap`
    }
  ],
}
