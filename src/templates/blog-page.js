import React from "react"
import SitePage from '../components/SitePage/index.jsx'

class BlogPageTemplate extends React.Component {
  render () {
    return <SitePage {...this.props.data.markdownRemark} config={this.props.data.site.siteMetadata} />
  }
}

export default BlogPageTemplate

export const pageQuery = graphql`
query PageBySlug($slug: String!) {
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
