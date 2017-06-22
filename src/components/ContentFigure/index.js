import React from 'react'

const ContentFigure = ({ destination, ogImage, overridingStyles, caption }) => {
  return (
    <figure class='floatCenter'>
      <a target='_blank' href='http://comicsbulletin.com/tiny-pages-made-ashes-51917-mirror-mirror-ii/'>
        <img style='height: 310px;' src='https://i2.wp.com/comicsbulletin.com/wp-content/uploads/2017/05/Mirror-Mirror-II-cover.jpg?fit=798%2C1200' alt='Early Printing Press' />
        <figcaption>Peep my in-depth review of Mirror Mirror II</figcaption>
      </a>
    </figure>
  )
}

export default ContentFigure
