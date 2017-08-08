import React from "react"
import Link from "gatsby-link"
import get from "lodash/get"
import Helmet from "react-helmet"
import include from "underscore.string/include"
import moment from 'moment'
import sortBy from 'lodash/sortBy'
import groupBy from 'lodash/groupBy'

import Bio from "../components/Bio"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  constructor () {
    super()
    this.state = {
      mobile: false,
      loadedImages: {}
    }
  }
  componentDidMount () {
    if (typeof (window) !== 'undefined') {
      this.setState({mobile: window.screen.width < 720})
    }
  }

  handleLoad (i) {
    let loadedImages = {...this.state.loadedImages}
    loadedImages[i] = true
    this.setState({ loadedImages })
  }

  render () {
    // console.log("props", this.props)
    const siteTitle = get(this, "props.data.site.siteMetadata.title")
    const posts = get(this, "props.data.allMarkdownRemark.edges")
    const sortedPosts = sortBy(posts, post => get(post, "node.frontmatter.date")).reverse()
    const pageLinks = sortedPosts.map((post, i) => {
      if (post.node.path !== "/404/" && get(post, 'node.frontmatter.date')) {
        const visibility = this.state.loadedImages[i] ? 'visible' : 'hidden'
        const title = get(post, "node.frontmatter.title") || post.node.path
        const description = get(post, 'node.frontmatter.description')
        const datePublished = get(post, 'node.frontmatter.date')
        const category = get(post, 'node.frontmatter.category')
        const image = get(post, 'node.frontmatter.indexImage')
        const smallImage = get(post, 'node.frontmatter.smallImage')
        const fontSize = this.state.mobile ? '3.5vw' : null
        return (
          <Link style={{ boxShadow: 'none' }} to={post.node.fields.slug}>
            <li
              key={post.node.path}
              style={{
                marginBottom: rhythm(1 / 4),
                listStyleType: 'none'
              }}
            >
                <img 
                  onLoad={() => this.handleLoad(i)}
                  style={{
                    marginLeft: 16,
                    marginBottom: 16,
                    height: 72,
                    width: 72,
                    borderRadius: 50,
                    verticalAlign: 'middle',
                    backgroundSize: 'cover',
                    display: 'inline-block'
                  }}
                  src={image}
                />
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
    })
    return (
      <div>
        <Helmet title={get(this, "props.data.site.siteMetadata.title")} />
        <ul style={{marginLeft: -20}}>
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


