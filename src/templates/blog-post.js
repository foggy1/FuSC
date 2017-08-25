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
    const { itemTitle, itemAuthor, itemType, itemPublisher } = post.frontmatter
    if (itemType) {
      return (
        <div 
          itemProp='about' itemScope itemType={`http://schema.org/${itemType}`}>
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
          <p
            style={{
              ...scale(-1 / 5),
              display: "block",
              fontWeight: '600',
              color: 'lightslategray',
              marginBottom: rhythm(1),
              marginTop: rhythm(-1)
            }}
          >
            {itemPublisher ? <span itemProp='publisher'>{itemPublisher}</span> : <span />}
          </p>
        </div>
      )
    } else {
      return <div />
    }
  }
  render () {
    const post = this.props.data.markdownRemark
    const theImage = post.frontmatter.indexImage ? 'https://fogupsomecomics.com' + post.frontmatter.indexImage.childImageSharp.resize.src : null
    const isPage = post.frontmatter.layout === 'page'
    const siteTitle = get(this.props, "data.site.siteMetadata.title")
    return (
      <div
        itemScope
        itemType={'http://schema.org/BlogPosting'}
      >
        <span itemProp='author' style={{display: 'none'}}>Austin Lanari</span>
        <span itemProp='publisher' style={{display: 'none'}}>Foggy at Best</span>
        <span itemProp='image' style={{display: 'none'}} itemScope itemType='http://schema.org/ImageObject'>
          <span itemProp='url'>
            {theImage}
          </span>
          <meta itemProp='height' content='500' />
          <meta itemProp='width' content='500' />
          <span />
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
        <meta property='og:url' content={`fogupsomecomics.com${post.fields.slug}`} />
        <meta property='og:type' content='article' />
        <meta property='og:title' content={post.frontmatter.title} />
        <meta property='og:description' content={post.frontmatter.description} />
        <meta name='twitter:site' value='@austinlanari' />
        <meta property='twitter:url' content={`fogupsomecomics.com${post.fields.slug}`} />
        <meta property='twitter:title' content={post.frontmatter.title} />
        <meta property='twitter:description' content={post.frontmatter.description} />
        <meta name='author' content='Austin Lanari' />
        <meta name='og:image' content={theImage || ''} />
        <meta name='twitter:image' content={theImage || ''} />
        <meta name='twitter:card' value='summary_large_image' />
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
            resize(width: 500, height: 500) {
              src
              originalName
            }
          }
        },
        layout,
        itemTitle,
        itemAuthor,
        itemType,
        itemPublisher,
        description
      }
    }
  }
`
