import React from 'react'
import moment from 'moment'
import Link from 'gatsby-link'
import './style.css'
import '../../css/highlight.css'
class SitePost extends React.Component {
  render () {
    const {
      html,
      frontmatter: {
        title,
        date,
        path,
        indexImage,
        description
      }
    } = this.props
    const { config } = this.props
    const home = (
      <div>
        <Link className='gohome' to={'/'}>All Articles</Link>
      </div>
    )

    return (
      <div>
        {home}
        <div className='blog-single'>
          <div className='text'>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <div className='date-published'>
              {date ? <em>Published {moment(date).format('D MMM YYYY')}</em> : <span />}
            </div>
          </div>
          <div className='footer'>
            <hr />
            <p>
              <a href={config.twitter}>
                <br /> <strong>{config.author}</strong> on Twitter
              </a>
            </p>
          </div>
        </div>
        <meta property='og:url' content={`fuckupsomecomics.com${path}`} />
        <meta property='og:type' content='article' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta name='twitter:site' value='@austinlanari' />
        <meta property='twitter:url' content={`fuckupsomecomics.com${path}`} />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:description' content={description} />
        <meta name='author' content='Austin Lanari' />
        <meta name='og:image' content={indexImage} />
        <meta name='twitter:image' content={indexImage} />
        <meta name='twitter:card' value='summary_large_image' />
        <script src="js/rrssb.min.js"></script>
      </div>
    )
  }
}

export default SitePost

