import React from 'react'
import './style.css'
import '../../../static/fonts/fontawesome/style.css'

class SiteLinks extends React.Component {
  render () {
    return (
      <div className='blog-links'>
        <ul>
            <li>
              <a href={'https://twitter.com/austinlanari'}>
                <i className='fa fa-twitter' />
              </a>
            </li>
            <li>
              <a href={`https://github.com/foggy1`}>
                <i className='fa fa-github-alt' />
              </a>
            </li>
        </ul>
        <ul>
            <li>
              <a href={`http://fuckupsomecomics.com/rss.xml`}><i className='fa fa-rss' /></a>
            </li>
        </ul>
      </div>
    )
  }
}

export default SiteLinks
