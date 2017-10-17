import React from 'react'
import {
  Button,
  Card,
  CardTitle,
  CardText,
  Media,
  MediaOverlay
} from 'react-md';
import Img from 'gatsby-image'
import profilePic from "./profile-pic.jpg"

// const style = { maxWidth: 320 }

const Simple = ({title, dateFrom, img, description}) => (
    <Card>
      <Media>
        <Img style={{zIndex: 0}} responsiveSizes={img} alt={title} />
        <MediaOverlay>
          <CardTitle title={title} subtitle={dateFrom}>
            {/*<Button className="md-cell--right" icon>star_outline</Button>*/}
          </CardTitle>
        </MediaOverlay>
      </Media>
      <CardText>
        <p>
         {description}
        </p>
      </CardText>
    </Card>
)

export default Simple
