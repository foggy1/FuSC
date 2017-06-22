import React from 'react'
import SiteSidebar from '../SiteSidebar'
import './style.css'

class SitePage extends React.Component {
  render () {
    const {html, frontmatter: { title }} = this.props
    return (
      <div>
      <SiteSidebar {...this.props} data={{site: {siteMetadata: {...this.props.config}}}} />
        <div className='content'>
          <div className='main'>
            <div className='main-inner'>
              <div className='blog-page'>
                <div className='text'>
                  <h1>{title}</h1>
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SitePage.propTypes = {
  route: React.PropTypes.object.isRequired
}

export default SitePage
