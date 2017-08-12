import React from "react"
import Helmet from "react-helmet"
import Link from "gatsby-link"
import get from "lodash/get"

import Bio from "../components/Bio"
import { rhythm, scale } from "../utils/typography"
import './typography.css'
import './reset.css'

class BlogPostTemplate extends React.Component {
  render () {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, "data.site.siteMetadata.title")
    return (
      <div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`}>

        </Helmet>
        <h1 style={{paddingTop: 0, marginTop: 30}}>{post.frontmatter.title === 'About' ? 'Hey' : post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: "block",
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.layout === 'page' ? <span /> : post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        {post.frontmatter.layout === 'page' ? <div/> : <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />}
        {post.frontmatter.layout === 'page' ? <span /> : <Bio />}
        <meta property='og:url' content={`fuckupsomecomics.com${post.fields.slug}`} />
        <meta property='og:type' content='article' />
        <meta property='og:title' content={post.frontmatter.title} />
        <meta property='og:description' content={post.frontmatter.description} />
        <meta name='twitter:site' value='@austinlanari' />
        <meta property='twitter:url' content={`fuckupsomecomics.com${post.fields.slug}`} />
        <meta property='twitter:title' content={post.frontmatter.title} />
        <meta property='twitter:description' content={post.frontmatter.description} />
        <meta name='author' content='Austin Lanari' />
        <meta name='og:image' content={post.frontmatter.indexImage} />
        <meta name='twitter:image' content={'https://fuckupsomecomics.com/static/2a959f7844320584f23f7c724baaa6e2-2a068.jpg'} />
        <meta name='twitter:card' value='summary' />
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug }}) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY"),
        indexImage {
          childImageSharp {
            responsiveSizes(quality: 50){
                  src
                  srcSet
              }
          }
        },
        layout,
        description
      }
    }
  }
`
