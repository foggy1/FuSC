import React from 'react'
import Link from 'gatsby-link'
import sortBy from 'lodash/sortBy'
import moment from 'moment'
import Helmet from 'react-helmet'
import access from 'safe-access'
import SiteSidebar from '../components/SiteSidebar'

class SiteIndex extends React.Component {
  render () {
    const pageLinks = []
    debugger
    // Sort pages.
    const sortedPages = sortBy(this.props.route.pages, page => access(page, 'data.date')).reverse()
    sortedPages.forEach((page) => {
      if (access(page, 'file.ext') === 'md' && access(page, 'data.layout') === 'post') {
        const title = access(page, 'data.title') || page.path
        const description = access(page, 'data.description')
        const datePublished = access(page, 'data.date')
        const category = access(page, 'data.category')
        const image = access(page, 'data.indexImage')

        pageLinks.push((
          <div className='blog-post' key={title}>
            <time dateTime={moment(datePublished).format('MMMM D, YYYY')}>
              {moment(datePublished).format('MMMM YYYY')}
            </time>
            <span style={{ padding: '5px' }} />
            <span className='blog-category'>{category}</span>
            <h2><Link style={{ borderBottom: 'none' }} to={page.path}>{title}</Link></h2>
            <img style={{height: '500px'}} src={image} alt={title} />
            <p dangerouslySetInnerHTML={{ __html: description }} />
            <Link className='readmore' to={page.path}>Read</Link>
          </div>
        ))
      }
    })

    return (
      <div>
        <Helmet title={'Fuck Up Some Comics'} />
        <SiteSidebar {...this.props} />
        <div className='content'>
          <div className='main'>
            <div className='main-inner'>
              {pageLinks}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SiteIndex.propTypes = {
  route: React.PropTypes.object
}

export default SiteIndex

