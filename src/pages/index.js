import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import moment from 'moment'
import sortBy from 'lodash/sortBy'
import IndexCard from '../components/IndexCard'
import { rhythm } from '../utils/typography'
import 'typeface-merriweather'
import 'typeface-merriweather-sans'

class BlogIndex extends React.Component {
  constructor () {
    super()
    this.state = {
      mobile: false
    }
  }
  componentDidMount () {
    if (typeof (window) !== 'undefined') {
      this.setState({mobile: window.screen.width < 720})
    }
  }

  renderList () {
    if (this.state.mobile) {
      return (
        <ul style={{marginLeft: -20}}>
          {this.renderLinks()}
        </ul>
      )
    } else {
        return (
          <div className='md-grid'>
            {this.renderLinks()}
          </div>
        )
    }
  }

  renderLinks () {
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    const fontSize = this.state.mobile ? '3.5vw' : null
    const sortedPosts = sortBy(posts, post => get(post, 'node.frontmatter.date')).reverse()
    const pageLinks = sortedPosts.map((post, i) => {
      if (post.node.path !== '/404/' && get(post, 'node.frontmatter.date')) {
        const title = get(post, 'node.frontmatter.title') || post.node.path
        const datePublished = get(post, 'node.frontmatter.date')
        const description = get(post, 'node.frontmatter.description')
        const image = get(post, 'node.frontmatter.indexImage.childImageSharp.responsiveSizes')
        if (!this.state.mobile) {
          return (
            <Link className='md-cell md-cell--12 md-cell--8-tablet' key={i} style={{ boxShadow: 'none', textDecoration: 'none', color: 'inherit' }} to={post.node.frontmatter.path}>
                <IndexCard
                  title={title}
                  dateFrom={moment(datePublished).fromNow()}
                  img={image}
                  description={description}
                />

            </Link>
          )    
        } else {
          return (
            <Link key={i} style={{ boxShadow: 'none' }} to={post.node.frontmatter.path}>
            <li
              style={{
                marginBottom: rhythm(1 / 4),
                listStyleType: 'none'
              }}
            >
              <div style={{verticalAlign: 'middle', height: 72, width: 72, marginLeft: 16, marginBottom: 16, overflow: 'hidden', borderRadius: 50, display: 'inline-block'}}>
                <Img
                  style={{
                    width: '100%',
                    backgroundSize: 'auto',
                  }}
                  responsiveSizes={image}
                />
              </div>
              <span
                style={{
                  marginLeft: 16,
                  verticalAlign: 'center',
                  display: 'inline-block',
                  paddingBottom: 5,
                }}
              >
                <div style={{ fontSize }}>{title}</div>
                <div style={{fontStyle: 'italic', color: 'lightSlateGrey'}}>{moment(datePublished).fromNow()}</div>
              </span>
            <hr/>
            </li>
          </Link>
          )
        }
      }
    })
    return pageLinks
  }

  render () {
    return (
      <div itemScope itemType='http://schema.org/Blog' >
        <Helmet title={get(this, 'props.data.site.siteMetadata.title')}>
          <meta property='og:url' content={`https://fogupsomecomics.com`} />
          <meta property='og:type' content='website' />
          <meta property='og:title' content={get(this, 'props.data.site.siteMetadata.title')} />
          <meta property='og:description' content={'A comic blog that features criticism of art comics, manga, and some comics of its own.'} />
          <meta name='twitter:site' value='@austinlanari' />
          <meta property='twitter:url' content={`https://fogupsomecomics.com`} />
          <meta property='twitter:title' content={get(this, 'props.data.site.siteMetadata.title')} />
          <meta property='twitter:description' content={'A comic blog that features criticism of art comics, manga, and some comics of its own.'} />
          <meta name='author' content='Austin Lanari' />
          <meta name='og:image' content={'https://s3.amazonaws.com/foggy1/Stryfes-resized.jpg'} />
          <meta name='twitter:image' content={'https://s3.amazonaws.com/foggy1/Stryfes-resized.jpg'} />
          <meta name='twitter:card' value='summary_large_image' />
          <meta itemProp='author' content='Austin Lanari' />
          <meta itemProp='copyrightHolder' content='Austin Lanari' />
          <meta itemProp='copyrightYear' content='2017' />
          <meta itemProp='headline' content='Fog Up Some Comics' />
          <meta name='description' content='Fog Up Some Comics is a comic blog that features criticism of art comics, manga, and some comics of its own.' />
        </Helmet>
        {this.renderList()}
      </div>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object
}

export default BlogIndex

export const pageQuery = graphql`
query IndexQuery {
  allImageSharp {
    edges {
      node {
        ... on ImageSharp {
          responsiveSizes(maxWidth: 670) {
            base64
            aspectRatio
            src
            srcSet
            sizes
            originalImg
            originalName
          }
        }
      }
    }
  }
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title,
          date,
          description,
          category,
          path,
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
          }
        }
      }
    }
  }
}
`
