import ReactGA from 'react-ga'

exports.onRouteUpdate = (state) => {
  ReactGA.pageview(state.pathname)
}
