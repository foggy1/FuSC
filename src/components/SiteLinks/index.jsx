import React from 'react'
import './style.css'
import '../../../static/fonts/fontawesome/style.css'

class SiteLinks extends React.Component {
  render () {
    const { title: siteTitle, author, twitter, github, rss } = this.props.data.site.siteMetadata

    return (
      <div className='blog-links'>
        <ul>
            <li>
              <a href={twitter}>
                <i className='fa fa-twitter' />
              </a>
            </li>
            <li>
              <a href={github}>
                <i className='fa fa-github-alt' />
              </a>
            </li>
        </ul>
        <ul>
            <li>
              <a href={rss}><i className='fa fa-rss' /></a>
            </li>
        </ul>
      </div>
    )
  }
}

export default SiteLinks
