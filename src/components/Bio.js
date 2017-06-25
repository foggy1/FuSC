import React from "react"

// Import typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import profilePic from "./profile-pic.jpg"
import { rhythm } from "../utils/typography"

class Bio extends React.Component {
  render() {
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
        <strong>Austin Lanari</strong>
        {" "}
        who builds and writes cool stuff as much as he can.
        {" "}
        <a href="https://twitter.com/austinlanari">
          I tweet
        </a>
      </p>
    )
  }
}

export default Bio
