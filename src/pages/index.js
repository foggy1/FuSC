import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import moment from 'moment'
import sortBy from 'lodash/sortBy'
import IndexCard from '../components/IndexCard'
import { GridList } from 'react-md'
import { rhythm } from '../utils/typography'

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

  render () {
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    const sortedPosts = sortBy(posts, post => get(post, 'node.frontmatter.date')).reverse()
    const pageLinks = sortedPosts.map((post, i) => {
      if (post.node.path !== '/404/' && get(post, 'node.frontmatter.date')) {
        const title = get(post, 'node.frontmatter.title') || post.node.path
        const datePublished = get(post, 'node.frontmatter.date')
        const description = get(post, 'node.frontmatter.description')
        const image = get(post, 'node.frontmatter.indexImage.childImageSharp.responsiveSizes')
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
      }
    })
    return (
      <div itemScope itemType='http://schema.org/Blog'>
        <meta itemProp='author' content='Austin Lanari' />
        <meta itemProp='copyrightHolder' content='Austin Lanari' />
        <meta itemProp='copyrightYear' content='2017' />
        <meta itemProp='headline' content='Fog Up Some Comics' />
        <meta name='description' content='Fog Up Some Comics unpacks some of the most challenging work in the comics medium today... and yesterday.' />
        <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />
        <div className="md-grid">
          {pageLinks}
        </div>
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
