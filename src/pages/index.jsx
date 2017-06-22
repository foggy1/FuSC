import React from 'react'
import Link from 'gatsby-link'
import sortBy from 'lodash/sortBy'
import get from "lodash/get"
import moment from 'moment'
import Helmet from 'react-helmet'
import SiteSidebar from '../components/SiteSidebar'

class SiteIndex extends React.Component {
  render () {
    const pageLinks = []
    const { title: siteTitle } = this.props.data.site.siteMetadata
    // Sort pages.
    const posts = get(this, "props.data.allMarkdownRemark.edges")
    const sortedPosts = sortBy(posts, post => post.node.frontmatter.date).reverse()
    sortedPosts.forEach(post => {
       if (post.node.frontmatter.layout === 'post') {
        const title = get(post, "node.frontmatter.title") || post.node.path
        const description = get(post, 'node.frontmatter.description')
        const datePublished = get(post, 'node.frontmatter.date')
        const category = get(post, 'node.frontmatter.category')
        const image = get(post, 'node.frontmatter.indexImage')
        pageLinks.push((
          <div className='blog-post' key={title}>
            <time dateTime={moment(datePublished).format('MMMM D, YYYY')}>
              {moment(datePublished).format('MMMM YYYY')}
            </time>
            <span style={{ padding: '5px' }} />
            <span className='blog-category'>{category}</span>
            <h2><Link style={{ borderBottom: 'none' }} to={post.node.frontmatter.path}>{title}</Link></h2>
            <img style={{height: '500px'}} src={image} alt={title} />
            <p dangerouslySetInnerHTML={{ __html: description }} />
            <Link className='readmore' to={post.node.frontmatter.path}>Read</Link>
          </div>
        ))
    }
  })

    return (
      <div>
        <Helmet title={siteTitle} />
        <SiteSidebar {...this.props} />
        <div className='content'>
          <div className='main'>
            <div className='main-inner'>
              {pageLinks}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SiteIndex

export const pagequery = graphql`
query IndexQuery {
  site {
    siteMetadata {
      title,
      description,
      author,
      twitter,
      github,
      rss
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
          layout,
          date,
          path,
          category,
          description,
          indexImage
        }
      }
    }
  }
}
`

