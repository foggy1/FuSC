import React from "react"
import Helmet from "react-helmet"
import Link from "gatsby-link"
import get from "lodash/get"
import Img from 'gatsby-image'
import Bio from "../components/Bio"

import { rhythm, scale } from "../utils/typography"

class BlogPageTemplate extends React.Component {
  renderItemInfo () {
    const page = this.props.data.markdownRemark
    const { itemTitle, itemAuthor, itemType, itemPublisher } = page.frontmatter
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
    const page = this.props.data.markdownRemark
    const theImageUrl = page.frontmatter.indexImage ? 'https://fogupsomecomics.com' + page.frontmatter.indexImage.childImageSharp.responsiveSizes.src : null
    const image = page.frontmatter.indexImage ? page.frontmatter.indexImage.childImageSharp.responsiveSizes : {}
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
            {theImageUrl}
          </span>
          <meta itemProp='height' content='500' />
          <meta itemProp='width' content='500' />
          <span />
        </span>
        <Helmet title={`${page.frontmatter.title} | ${siteTitle}`}>
          <meta property='og:url' content={`fogupsomecomics.com${page.fields.slug}`} />
          <meta property='og:type' content='article' />
          <meta property='og:title' content={page.frontmatter.title} />
          <meta property='og:description' content={page.frontmatter.description} />
          <meta name='twitter:site' value='@austinlanari' />
          <meta property='twitter:url' content={`fogupsomecomics.com${page.fields.slug}`} />
          <meta property='twitter:title' content={page.frontmatter.title} />
          <meta property='twitter:description' content={page.frontmatter.description} />
          <meta name='author' content='Austin Lanari' />
          <meta name='og:image' content={theImageUrl || ''} />
          <meta name='twitter:image' content={theImageUrl || ''} />
          <meta name='twitter:card' value='summary_large_image' />
        </Helmet>
        <h1
          style={{paddingTop: 0, marginTop: 30, paddingBottom: 10}}
          itemProp="headline"
        >
          {page.frontmatter.title}
        </h1>
        <Img
          style={{
            width: '40%',
            float: 'left',
            backgroundSize: 'auto',
            marginRight: 13,
            zIndex: -1
          }}
          responsiveSizes={image}
        />
        {this.renderItemInfo()}
        <p
          style={{
            ...scale(-1 / 5),
            marginBottom: rhythm(1),
          }}
        >
        </p>
        <div
          dangerouslySetInnerHTML={{ __html: page.html }}
          itemProp='articleBody'
        />
        {page.frontmatter.layout === 'page' ? <div/> : <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />}
        {page.frontmatter.layout === 'page' ? <span /> : <Bio />}
      </div>
    )
  }
}

export default BlogPageTemplate

export const pageQuery = graphql`
  query BlogPageByPath($slug: String!) {
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
            responsiveSizes(maxWidth: 670){
                base64
                aspectRatio
                src
                srcSet
                sizes
                originalImg
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
