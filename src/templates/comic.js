import React from "react"
import Helmet from "react-helmet"
import get from "lodash/get"
import { rhythm, scale } from "../utils/typography"

class ComicTemplate extends React.Component {
  renderItemInfo () {
    const post = this.props.data.markdownRemark
    const { itemArtist, itemType } = post.frontmatter
    if (itemType) {
      return (
        <div 
          itemProp='about' itemScope itemType={`http://schema.org/${itemType}`}>
          <p
            style={{
              ...scale(-1 / 5),
              display: "block",
              color: 'lightslategray',
              marginBottom: rhythm(1),
              marginTop: rhythm(-1),
              textAlign: 'center'
            }}
          >
            {itemArtist ? <span itemProp='artist'>Art by {itemArtist}</span> : <span />}
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
    const { itemArtist } = post.frontmatter
    return (
      <div
        itemScope
        itemType={'http://schema.org/ComicStory'}
      >
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`}>
          <meta property='og:url' content={`fogupsomecomics.com${post.frontmatter.path}`} />
          <meta property='og:type' content='article' />
          <meta property='og:title' content={post.frontmatter.title} />
          <meta property='og:description' content={post.frontmatter.description} />
          <meta name='twitter:site' value='@austinlanari' />
          <meta property='twitter:url' content={`fogupsomecomics.com${post.frontmatter.path}`} />
          <meta property='twitter:title' content={post.frontmatter.title} />
          <meta property='twitter:description' content={post.frontmatter.description} />
          <meta name='author' content='Austin Lanari' />
          <meta name='og:image' content={theImage || ''} />
          <meta name='twitter:image' content={theImage || ''} />
          <meta name='twitter:card' value='summary_large_image' />
        </Helmet>
        <span itemProp='author' style={{display: 'none'}}>Austin Lanari</span>
        <span itemProp='publisher' style={{display: 'none'}}>Foggy at Best</span>
        <span itemProp='artist' style={{display: 'none'}}>{itemArtist}</span>
        <span itemProp='image' style={{display: 'none'}} itemScope itemType='http://schema.org/ImageObject'>
          <span itemProp='url'>
            {theImage}
          </span>
          <meta itemProp='height' content='500' />
          <meta itemProp='width' content='500' />
          <span />
        </span>
        <h1
          style={{paddingTop: 0, marginTop: 30, textAlign: 'center'}}
          itemProp="headline"
        >
          {post.frontmatter.title === 'About' ? 'Hey' : post.frontmatter.title}
        </h1>
        {this.renderItemInfo()}
        <div
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp='articleBody'
        />

      </div>
    )
  }
}

export default ComicTemplate

export const pageQuery = graphql`
  query ComicByPath($slug: String!) {
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
        path
        date(formatString: "MMMM DD, YYYY"),
        indexImage {
          childImageSharp {
              resize(width: 500, height: 500){
                src
                }
          }
        },
        layout,
        itemTitle,
        itemAuthor,
        itemType,
        itemArtist,
        itemPublisher,
        description
      }
    }
  }
`
