import React from 'react'

import '../css/reset.css'
import '../css/typography.css'
import '../css/base.css'

class Template extends React.Component {
  render () {
    const { children } = this.props

    return (
      <div className='wrapper'>
        {children}
      </div>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.any
}

export default Template
