import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import ReadNext from '../ReadNext'
import './style.css'
import '../../static/css/highlight.css'

class SitePost extends React.Component {
  render () {
    const { route } = this.props
    const post = route.page.data
    const home = (
      <div>
        <Link className='gohome' to={prefixLink('/')}>All Articles</Link>
      </div>
    )

    return (
      <div>
        {home}
        <div className='blog-single'>
          <div className='text'>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
            <div className='date-published'>
              <em>Published {moment(post.date).format('D MMM YYYY')}</em>
            </div>
          </div>
          <div className='footer'>
            <ReadNext post={post} {...this.props} />
            <hr />
            <p>
              <a href={config.siteTwitterUrl}>
                <br /> <strong>{config.siteAuthor}</strong> on Twitter
              </a>
            </p>
          </div>
        </div>
        <meta property="og:url" content={prefixLink(post.path)} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta name="twitter:site" value="@austinlanari" />
        <meta property="twitter:url" content={prefixLink(post.path)} />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.description} />
        <meta name="author" content="Austin Lanari" />
        <meta name="og:image" content={post.indexImage} />
        <meta name="twitter:image" content={post.indexImage} />
        <meta name="twitter:card" value="summary_large_image" />
      </div>
    )
  }
}

SitePost.propTypes = {
  route: React.PropTypes.object.isRequired
}

export default SitePost
