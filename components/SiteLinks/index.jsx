import React from 'react'
import { config } from 'config'
import './style.css'
import '../../static/fonts/fontawesome/style.css'

class SiteLinks extends React.Component {
  render () {
    return (
      <div className='blog-links'>
        <ul>
          {config.siteTwitterUrl && (
            <li>
              <a href={config.siteTwitterUrl}>
                <i className='fa fa-twitter' />
              </a>
            </li>
          )}
          {config.siteGithubUrl && (
            <li>
              <a href={config.siteGithubUrl}>
                <i className='fa fa-github-alt' />
              </a>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default SiteLinks
