import React from "react"

// Import typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import profilePic from "./profile-pic.jpg"
import { rhythm } from "../utils/typography"

class Bio extends React.Component {
  render () {
    return (
      <p
        style={{
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Austin Lanari`}
          style={{
            float: "left",
            marginRight: rhythm(1 / 4),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: 30
          }}
        />
        Written by
        {" "}
        <strong><a href="https://twitter.com/austinlanari" target='_blank'>Austin Lanari</a></strong>
        {" "}
        who likes to build and write about cool stuff.
        {" "}
        <a style={{display: 'inline-block', marginLeft: 10}}href='https://ko-fi.com/A12039KE' target='_blank'><img height='36' style={{border:0, height: 36}} src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=0' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
      </p>
    )
  }
}

export default Bio
