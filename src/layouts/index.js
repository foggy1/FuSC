import React from "react"
import "./material.scss";
import Link from "gatsby-link"
import { Container } from "react-responsive-grid"
import Back from 'react-icons/lib/fa/arrow-left'
import Menu from 'react-icons/lib/fa/bars'
import { rhythm } from "../utils/typography"
import { NavigationDrawer, SVGIcon, List, ListItem, FontIcon } from 'react-md'

class Template extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mobile: false,
      isOpen: false
    }
  }

  componentDidMount () {
    var check = false;
    (function (a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    this.setState({mobile: check})
  }

  showSettings (event) {
    event.preventDefault();
  }

  handleSideNavigation () {
    this.setState({isOpen: false})
  }

  renderBack () {
    return (
      <Link
        style={{
          boxShadow: "none",
          textDecoration: "none",
          color: "inherit",
          zIndex: 4
        }}
        to={"/"}
      >
        <Back size={24} color={'white'} style={styles.bmBurgerButton} />
      </Link>
    )
  }

  links () {
    return ([
        <Link
        key={0}
        style={{
          boxShadow: "none",
          textDecoration: "none",
          color: "inherit",
          zIndex: 4
        }}
        to={"/"}
      >
        <ListItem
          primaryText="Home"
          leftIcon={<FontIcon>home</FontIcon>}>
        </ListItem>
        </Link>,
        <Link
        key={1}
        style={{
          boxShadow: "none",
          textDecoration: "none",
          color: "inherit",
          zIndex: 4
        }}
        to={"/about"}
      >
        
        <ListItem
          primaryText="About"
          leftIcon={<FontIcon>face</FontIcon>}
        />
        </Link>
    ])
  }

  render () {
    const { location, children } = this.props
    const height = this.state.mobile ? 56 : 64
    styles.bmBurgerButton.left = this.state.mobile ? 16 : 24
    styles.bmBurgerButton.top = this.state.mobile ? 16 : 20
    styles.bmBurgerButton.fontWeight = '600'
    let header, title
    if (location.pathname === "/" || location.pathname === '/about') {
      title = location.pathname === '/' ? 'Home' : 'About'
      header = (
        <Menu
          styles={styles}
          onStateChange={({isOpen}) => this.setState({isOpen})}
          isOpen={this.state.isOpen}
        >
          <Link onClick={this.handleSideNavigation.bind(this)} id="home" className="menu-item" to="/">Home</Link>
          <Link onClick={this.handleSideNavigation.bind(this)} id="about" className="menu-item" to="/about">About</Link>
        </Menu>
          // <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      )
    } else if (location.pathname.includes('/blog')) {
      title = 'Blog'
      header = this.renderBack()
    } else if (location.pathname.includes('/comics')) {
      title = 'Comics'
      header = this.renderBack()
    }
    const backgroundColor = location.pathname === "/" ? {backgroundColor: '#efefef'} : {}
    return (
      <div style={{...backgroundColor, paddingBottom: 60, minHeight: '100vh', position: 'relative'}}>
        <NavigationDrawer
          toolbarTitle={title}
          toolbarTitleStyle={{color: 'white', marginTop: 0}}
          navItems={this.links()}
          drawerTitle={'f_u_s_c'}
          navStyle={{fontSize: 20}}
        >
          <Container
            style={{
              maxWidth: rhythm(24),
              padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            }}
          >
            {children()}
          </Container>
        <footer
          style={{
            minHeight: 50,
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: '#26418f'
          }}
        >
          <div style={{width: '90%', padding: 10, height: 50, lineHeight: 1.5, color: 'white', margin: 'auto'}}>
            <span style={{marginTop: 20}}>©</span> 2017 Austin Lanari
          </div>
        </footer>
        </NavigationDrawer>
      </div>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object
}

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '24px',
    color: 'white',
    height: '24px',
    left: 16,
    top: 16,
    zIndex: 4
  },
  bmBurgerBars: {
    background: 'white',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: 'white',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
  },
  bmItem: {
    paddingTop: 16,
    textDecoration: 'none'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
    height: '100%'
  }
}

export default Template
