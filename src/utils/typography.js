import Typography from 'typography'
import Parnassus from 'typography-theme-parnassus'

const typography = new Typography(Parnassus)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
