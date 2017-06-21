import React from "react"
import SitePost from '../components/SitePost/index.jsx'

class BlogPostTemplate extends React.Component {
  render () {
    return <SitePost {...this.props.data.markdownRemark} />
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
query BlogPostBySlug($slug: String!) {
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
