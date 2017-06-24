import React from 'react'
import Link from 'gatsby-link'
if (process.env.NODE_ENV === `development`) {
  require('./style.css')
}

class SiteNav extends React.Component {
  render () {
    return (
      <nav className='blog-nav'>
        <ul>
          <li>
            <Link to={'/'} activeClassName='current' onlyActiveOnIndex> Articles
            </Link>
          </li>
          <li>
            <Link to={'/about/'} activeClassName='current'> About
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default SiteNav
