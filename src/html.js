import React, { Component } from "react"
import { TypographyStyle } from "react-typography"
import Helmet from "react-helmet"
import typography from "./utils/typography"

let stylesStr
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`)
  } catch (e) {
    console.log(e)
  }
}

class Main extends Component {
  render () {
    const head = Helmet.rewind()
    let css
    if (process.env.NODE_ENV === `production`) {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      )
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {this.props.headComponents}
          <TypographyStyle typography={typography} />
          <link rel="icon" href="./favicons/favicon-32x32.ico" type="image/png" size='32x32' />
          <link rel="canonical" href="https://fogupsomecomics.com/" />
          {css}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}

export default Main
