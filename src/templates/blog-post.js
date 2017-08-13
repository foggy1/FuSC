import React from "react"
import Helmet from "react-helmet"
import Link from "gatsby-link"
import get from "lodash/get"

import Bio from "../components/Bio"
import { rhythm, scale } from "../utils/typography"
import './typography.css'
import './reset.css'

class BlogPostTemplate extends React.Component {
  renderItemInfo () {
    const post = this.props.data.markdownRemark
    const { itemTitle, itemAuthor, itemType } = post.frontmatter
    if (itemType) {
      return (
        <div itemProp='about' itemScope itemType={`http://schema.org/${itemType}`}>
          <p
            style={{
              ...scale(-1 / 5),
              display: "block",
              color: 'lightslategray',
              fontStyle: 'italic',
              marginBottom: rhythm(1),
              marginTop: rhythm(-1),
            }}
          >
            {itemTitle ? <span itemProp="name">{itemTitle}</span> : <span />}
          </p>
          <p
            style={{
              ...scale(-1 / 5),
              display: "block",
              color: 'lightslategray',
              marginBottom: rhythm(1),
              marginTop: rhythm(-1),
            }}
          >
            {itemAuthor ? <span itemProp='author'>{itemAuthor}</span> : <span />}
          </p>
        </div>
      )
    } else {
      return <div />
    }
  }
  render () {
    const post = this.props.data.markdownRemark
    const isPage = post.frontmatter.layout === 'page'
    const { itemTitle, itemAuthor } = post.frontmatter
    const siteTitle = get(this.props, "data.site.siteMetadata.title")
    return (
      <div
        itemScope
        itemType={'http://schema.org/BlogPosting'}
      >
        <span itemProp='author' style={{display: 'none'}}>Austin Lanari</span>
        <span itemProp='image' style={{display: 'none'}} itemScope itemType='http://schema.org/ImageObject'>
          {post.frontmatter.indexImage ? 'fuckupsomecomics.com' + post.frontmatter.indexImage.childImageSharp.responsiveSizes.src : null}
        </span>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`}>

        </Helmet>
        <h1
          style={{paddingTop: 0, marginTop: 30}}
          itemProp="headline"
        >
          {post.frontmatter.title === 'About' ? 'Hey' : post.frontmatter.title}
        </h1>
        {this.renderItemInfo()}
        <p
          style={{
            ...scale(-1 / 5),
            display: "block",
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {isPage ? <span /> : <span itemProp='datePublished'>{post.frontmatter.date}</span>}
        </p>
        <div
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp='articleBody'
        />
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
        itemTitle,
        itemAuthor,
        itemType,
        description
      }
    }
  }
`
