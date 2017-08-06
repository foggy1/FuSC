import React from "react"
import Link from "gatsby-link"
import { Container } from "react-responsive-grid"
import materialize from '../../static/js/materialize.js'
import '../../static/css/materialize.css'
import { Navbar, NavItem } from 'react-materialize'
import { rhythm, scale } from "../utils/typography"

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header
    if (location.pathname === "/") {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: "none",
              textDecoration: "none",
              color: "inherit",
            }}
            to={"/"}
          >
            Fuck Up Some Comics
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: "Montserrat, sans-serif",
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: "none",
              textDecoration: "none",
              color: "inherit",
            }}
            to={"/"}
          >
            Fuck Up Some Comics
          </Link>
        </h3>
      )
    }
    return (
      <div>
        <Navbar brand='logo' right options={{onPress: () => console.log('what')}}>
          <NavItem href='/'>Home</NavItem>
          <NavItem href='components.html'>Components</NavItem>
        </Navbar>
        <Container
          style={{
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          {children()}
        </Container>
      </div>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.function,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template
