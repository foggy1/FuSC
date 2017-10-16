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

const Simple = ({title, dateFrom, body, img}) => (
  <div className="md-grid">
    <Card className="cards__example md-cell md-cell--6 md-cell--8-tablet">
      <Media>
        <Img responsiveSizes={img} alt="Nature from lorempixel" />
        <MediaOverlay>
          <CardTitle title={title} subtitle={dateFrom}>
            {/*<Button className="md-cell--right" icon>star_outline</Button>*/}
          </CardTitle>
        </MediaOverlay>
      </Media>
      <CardText>
        <p>
         {body}
        </p>
      </CardText>
    </Card>
    </div>
)

export default Simple
