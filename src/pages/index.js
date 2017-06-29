import React from "react"
import Link from "gatsby-link"
import get from "lodash/get"
import Helmet from "react-helmet"
import include from "underscore.string/include"
import moment from 'moment'
import sortBy from 'lodash/sortBy'

import Bio from "../components/Bio"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
    //   const sortedPages = sortBy(this.props.route.pages, page => access(page, 'data.date')).reverse()
    // sortedPages.forEach((page) => {
    //   if (access(page, 'file.ext') === 'md' && access(page, 'data.layout') === 'post') {
    //     const title = access(page, 'data.title') || page.path
    //     const description = access(page, 'data.description')
    //     const datePublished = access(page, 'data.date')
    //     const category = access(page, 'data.category')
    //     const image = access(page, 'data.indexImage')

    //     pageLinks.push((
    //       <div className='blog-post' key={title}>
    //         <time dateTime={moment(datePublished).format('MMMM D, YYYY')}>
    //           {moment(datePublished).format('MMMM YYYY')}
    //         </time>
    //         <span style={{ padding: '5px' }} />
    //         <span className='blog-category'>{category}</span>
    //         <h2><Link style={{ borderBottom: 'none' }} to={prefixLink(page.path)}>{title}</Link></h2>
    //         <img style={{height: '500px'}} src={image} alt={title} />
    //         <p dangerouslySetInnerHTML={{ __html: description }} />
    //         <Link className='readmore' to={prefixLink(page.path)}>Read</Link>
    //       </div>
    //     ))
    //   }
    // })

  render () {
    // console.log("props", this.props)
    const pageLinks = []
    const siteTitle = get(this, "props.data.site.siteMetadata.title")
    const posts = get(this, "props.data.allMarkdownRemark.edges")
    const sortedPosts = sortBy(posts, post => get(post, "node.frontmatter.date")).reverse()
    sortedPosts.forEach(post => {
      if (post.node.path !== "/404/") {
        const title = get(post, "node.frontmatter.title") || post.node.path
        const description = get(post, 'node.frontmatter.description')
        const datePublished = get(post, 'node.frontmatter.date')
        const category = get(post, 'node.frontmatter.category')
        const image = get(post, 'node.frontmatter.indexImage')
        pageLinks.push(
          <li
            key={post.node.path}
            style={{
              marginBottom: rhythm(1 / 4),
            }}
          >
            <Link style={{ boxShadow: "none" }} to={post.node.fields.slug}>
              {post.node.frontmatter.title}
            </Link>
          </li>
        )
      }
    })

    return (
      <div>
        <Helmet title={get(this, "props.data.site.siteMetadata.title")} />
        <ul>
          {pageLinks}
        </ul>
      </div>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex

export const pageQuery = graphql`
query IndexQuery {
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
          indexImage
        }
      }
    }
  }
}
`
