import React from 'react'
if (process.env.NODE_ENV === `development`) {
  require('../css/reset.css')
  require('../css/typography.css')
  require('../css/base.css')
}

class Template extends React.Component {
  render () {
    return (
      <div className='wrapper'>
        {this.props.children()}
      </div>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.any
}

export default Template
