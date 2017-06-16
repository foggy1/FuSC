import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import ReadNext from '../ReadNext'
import './style.css'
import './rrssb.css'
import '../../static/css/highlight.css'
// import './rrssb'

class SitePost extends React.Component {
  render () {
    const { route } = this.props
    console.log(this.props)
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
            <ul className="rrssb-buttons clearfix">
              <li className="rrssb-email">
                <a href="mailto:?Subject=your%20subject">
                  <span className="rrssb-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path d="M20.11 26.147c-2.335 1.05-4.36 1.4-7.124 1.4C6.524 27.548.84 22.916.84 15.284.84 7.343 6.602.45 15.4.45c6.854 0 11.8 4.7 11.8 11.252 0 5.684-3.193 9.265-7.398 9.3-1.83 0-3.153-.934-3.347-2.997h-.077c-1.208 1.986-2.96 2.997-5.023 2.997-2.532 0-4.36-1.868-4.36-5.062 0-4.75 3.503-9.07 9.11-9.07 1.713 0 3.7.4 4.6.972l-1.17 7.203c-.387 2.298-.115 3.3 1 3.4 1.674 0 3.774-2.102 3.774-6.58 0-5.06-3.27-8.994-9.304-8.994C9.05 2.87 3.83 7.545 3.83 14.97c0 6.5 4.2 10.2 10 10.202 1.987 0 4.09-.43 5.647-1.245l.634 2.22zM16.647 10.1c-.31-.078-.7-.155-1.207-.155-2.572 0-4.596 2.53-4.596 5.53 0 1.5.7 2.4 1.9 2.4 1.44 0 2.96-1.83 3.31-4.088l.592-3.72z"/></svg></span>
                  <span className="rrssb-text">email</span>
                </a>
              </li>
              <li className="rrssb-facebook">
                <a href="https://www.facebook.com/sharer/sharer.php?u=http://your-url-here" className="popup">
                  <span className="rrssb-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29"><path d="M26.4 0H2.6C1.714 0 0 1.715 0 2.6v23.8c0 .884 1.715 2.6 2.6 2.6h12.393V17.988h-3.996v-3.98h3.997v-3.062c0-3.746 2.835-5.97 6.177-5.97 1.6 0 2.444.173 2.845.226v3.792H21.18c-1.817 0-2.156.9-2.156 2.168v2.847h5.045l-.66 3.978h-4.386V29H26.4c.884 0 2.6-1.716 2.6-2.6V2.6c0-.885-1.716-2.6-2.6-2.6z"/></svg></span>
                  <span className="rrssb-text">facebook</span>
                </a>
              </li>
              <li className="rrssb-twitter">
                <a href="https://twitter.com/intent/tweet?text=http://rrssb.ml"
                className="popup">
                  <span className="rrssb-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path d="M24.253 8.756C24.69 17.08 18.297 24.182 9.97 24.62a15.093 15.093 0 0 1-8.86-2.32c2.702.18 5.375-.648 7.507-2.32a5.417 5.417 0 0 1-4.49-3.64c.802.13 1.62.077 2.4-.154a5.416 5.416 0 0 1-4.412-5.11 5.43 5.43 0 0 0 2.168.387A5.416 5.416 0 0 1 2.89 4.498a15.09 15.09 0 0 0 10.913 5.573 5.185 5.185 0 0 1 3.434-6.48 5.18 5.18 0 0 1 5.546 1.682 9.076 9.076 0 0 0 3.33-1.317 5.038 5.038 0 0 1-2.4 2.942 9.068 9.068 0 0 0 3.02-.85 5.05 5.05 0 0 1-2.48 2.71z"/></svg></span>
                  <span className="rrssb-text">twitter</span>
                </a>
              </li>
            </ul>
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
