import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import SiteNav from '../SiteNav'
import SiteLinks from '../SiteLinks'
import './style.css'
import profilePic from '../../pages/photo.jpg'

class SiteSidebar extends React.Component {
  render () {
    const { location } = this.props
    const isHome = location.pathname === prefixLink('/')

    /* eslint-disable jsx-a11y/img-redundant-alt */
    const header = (
      <header>
        <Link style={{ textDecoration: 'none', borderBottom: 'none', outline: 'none' }} to={prefixLink('/')}>
          <img style={{height: '200px'}} src={require('./future_logo.png')} />
        </Link>
      </header>
    )
    /* eslint-enable jsx-a11y/img-redundant-alt */

    return (
      <div className='sidebar'>
        <div className='sidebar-inner'>
          <div className='blog-details'>
            <header>
              {header}
            </header>
          </div>
          <div className='blog-options'>
            <SiteNav {...this.props} />
            <footer>
              <SiteLinks {...this.props} />
              <p className='copyright'>
                &copy; Austin Lanari 2017
              </p>
            </footer>
          </div>
        </div>
      </div>
    )
  }
}

SiteSidebar.propTypes = {
  location: React.PropTypes.object
}

export default SiteSidebar
