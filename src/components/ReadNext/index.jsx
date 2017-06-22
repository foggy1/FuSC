import React from 'react'
import { Link } from 'react-router'

import './style.css'

class ReadNext extends React.Component {
  render () {
    const { post } = this.props
    const { pages } = this.props.route
    const { readNext } = post

    let nextPost
    if (readNext) {
      nextPost = pages.find(page => page.path.includes(readNext))
    }
    if (!nextPost) {
      return React.createElement('noscript', null)
    }

    const description = nextPost.data.description

    return (
      <div>
        <h6 style={{ fontSize: '16px', margin: '20px 0 0' }}>READ THIS NEXT:</h6>
        <h3 style={{ margin: '5px 0 0' }}>
          <Link to={nextPost.path} query={{ readNext: true }}>
            {nextPost.data.title}
          </Link>
        </h3>
        <p className='description'>
          {description}
        </p>
      </div>
    )
  }
}

ReadNext.propTypes = {
  post: React.PropTypes.object.isRequired,
  pages: React.PropTypes.array,
  route: React.PropTypes.object
}

export default ReadNext

