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
      loadedImages: {},
      resizedImages: []
    }
  }
  componentDidMount () {
    if (typeof (window) !== 'undefined') {
      this.setState({mobile: window.screen.width < 720})
    }
    const resizedImages = get(this, 'props.data.allImageSharp.edges').map(n => n.node.resize)
    this.setState({resizedImages})
  }

  handleLoad (i) {
    let loadedImages = {...this.state.loadedImages}
    loadedImages[i] = true
    this.setState({ loadedImages })
  }

  render () {
    // console.log("props", this.props)
    const {resizedImages} = this.state
    const posts = get(this, "props.data.allMarkdownRemark.edges")
    const sortedPosts = sortBy(posts, post => get(post, "node.frontmatter.date")).reverse()
    const pageLinks = sortedPosts.map((post, i) => {
      if (post.node.path !== "/404/" && get(post, 'node.frontmatter.date')) {
        const title = get(post, "node.frontmatter.title") || post.node.path
        const datePublished = get(post, 'node.frontmatter.date')
        const image = get(post, 'node.frontmatter.indexImage.childImageSharp.resize.src')
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
              <div style={{verticalAlign: 'middle', height: 72, width: 72, marginLeft: 16, marginBottom: 16, overflow: 'hidden', borderRadius: 50, display: 'inline-block'}}>
                <img
                  onLoad={() => this.handleLoad(i)}
                  style={{
                    width: '100%',
                    backgroundSize: 'auto',
                  }}
                  src={image}
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
    })
    return (
      <div itemScope itemType='http://schema.org/Blog'>
        <meta itemProp='author' content='Austin Lanari' />
        <meta itemProp='copyrightHolder' content='Austin Lanari' />
        <meta itemProp='copyrightYear' content='2017' />
        <meta itemProp='headline' content='Fog Up Some Comics' />
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
  allImageSharp {
    edges {
      node {
        ... on ImageSharp {
          resize(width: 100, height: 100) {
            src
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
          indexImage {
            childImageSharp {
              resize(width: 80, height: 80){
                  src
                }
            }
          }
        }
      }
    }
  }
}
`
