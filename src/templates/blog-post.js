import React from "react"
import SitePost from '../components/SitePost/index.jsx'

class BlogPostTemplate extends React.Component {
  render () {
    return <SitePost {...this.props.data.markdownRemark} config={this.props.data.site.siteMetadata} />
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
query BlogPostBySlug($slug: String!) {
  site {
    siteMetadata {
      description,
      author,
      twitter,
      github,
      rss
    }
  }
  markdownRemark(fields: { slug: { eq: $slug }}) {
    html
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
`
