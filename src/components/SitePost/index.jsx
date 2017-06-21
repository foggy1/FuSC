import React from 'react'
import moment from 'moment'
import Link from 'gatsby-link'
import ReadNext from '../ReadNext'
import './style.css'
import './rrssb.css'
import '../../../static/css/highlight.css'
class SitePost extends React.Component {
  render () {
    const {
      html,
      frontmatter: {
        title,
        date,
        path,
        indexImage,
        description
      }
    } = this.props
    const config = {
      title: `Fuck Up Some Comics`,
      description: `Fuck up some comics, yeah`,
      author: 'Foggy',
      twitter: `https://www.twitter.com/austinlanari`,
      github: `https://www.github.com/foggy1`,
      rss: `http://fuckupsomecomics.com/rss.xml`,
      atom: `http://fuckupsomecomics.com/atom.xml`
    }
    const home = (
      <div>
        <Link className='gohome' to={'/'}>All Articles</Link>
      </div>
    )

    return (
      <div>
        {home}
        <div className='blog-single'>
          <div className='text'>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <div className='date-published'>
              <em>Published {moment(date).format('D MMM YYYY')}</em>
            </div>
          </div>
          <div className='footer'>
            <hr />
            <ul className='rrssb-buttons clearfix'>
              <li className='rrssb-facebook'>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=http://fuckupsomecomics.com${(path)}`} className='popup'>
                  <span className='rrssb-icon'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 29 29'><path d='M26.4 0H2.6C1.714 0 0 1.715 0 2.6v23.8c0 .884 1.715 2.6 2.6 2.6h12.393V17.988h-3.996v-3.98h3.997v-3.062c0-3.746 2.835-5.97 6.177-5.97 1.6 0 2.444.173 2.845.226v3.792H21.18c-1.817 0-2.156.9-2.156 2.168v2.847h5.045l-.66 3.978h-4.386V29H26.4c.884 0 2.6-1.716 2.6-2.6V2.6c0-.885-1.716-2.6-2.6-2.6z' /></svg></span>
                  <span className='rrssb-text'>facebook</span>
                </a>
              </li>
              <li className='rrssb-twitter'>
                <a href={`https://twitter.com/intent/tweet?text=Foggy wrote a thing (@AustinLanari) http://fuckupsomecomics.com${(path)}`}
                  className='popup'>
                  <span className='rrssb-icon'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'><path d='M24.253 8.756C24.69 17.08 18.297 24.182 9.97 24.62a15.093 15.093 0 0 1-8.86-2.32c2.702.18 5.375-.648 7.507-2.32a5.417 5.417 0 0 1-4.49-3.64c.802.13 1.62.077 2.4-.154a5.416 5.416 0 0 1-4.412-5.11 5.43 5.43 0 0 0 2.168.387A5.416 5.416 0 0 1 2.89 4.498a15.09 15.09 0 0 0 10.913 5.573 5.185 5.185 0 0 1 3.434-6.48 5.18 5.18 0 0 1 5.546 1.682 9.076 9.076 0 0 0 3.33-1.317 5.038 5.038 0 0 1-2.4 2.942 9.068 9.068 0 0 0 3.02-.85 5.05 5.05 0 0 1-2.48 2.71z' /></svg></span>
                  <span className='rrssb-text'>twitter</span>
                </a>
              </li>
              <li className='rrssb-tumblr'>
                <a target='_blank' href={`http://tumblr.com/share/link?url=http://fuckupsomecomics.com${(path)}`}>
                  <span className='rrssb-icon'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'><path d='M18.02 21.842c-2.03.052-2.422-1.396-2.44-2.446v-7.294h4.73V7.874H15.6V1.592h-3.714s-.167.053-.182.186c-.218 1.935-1.144 5.33-4.988 6.688v3.637h2.927v7.677c0 2.8 1.7 6.7 7.3 6.6 1.863-.03 3.934-.795 4.392-1.453l-1.22-3.54c-.52.213-1.415.413-2.115.455z' /></svg>
                  </span>
                  <span className='rrssb-text'>tumblr</span>
                </a>
              </li>
              <li className='rrssb-googleplus'>
                <a href={"https://plus.google.com/share?url=" + encodeURI(`http://fuckupsomecomics.com${(path)}`)} className='popup'>
                  <span className='rrssb-icon'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M21 8.29h-1.95v2.6h-2.6v1.82h2.6v2.6H21v-2.6h2.6v-1.885H21V8.29zM7.614 10.306v2.925h3.9c-.26 1.69-1.755 2.925-3.9 2.925-2.34 0-4.29-2.016-4.29-4.354s1.885-4.353 4.29-4.353c1.104 0 2.014.326 2.794 1.105l2.08-2.08c-1.3-1.17-2.924-1.883-4.874-1.883C3.65 4.586.4 7.835.4 11.8s3.25 7.212 7.214 7.212c4.224 0 6.953-2.988 6.953-7.082 0-.52-.065-1.104-.13-1.624H7.614z' /></svg>                      </span>
                  <span className='rrssb-text'>google+</span>
                </a>
              </li>
              <li className='rrssb-pocket'>
                <a href={`https://getpocket.com/save?url=http://fuckupsomecomics.com${(path)}`}>
                  <span className='rrssb-icon'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><path d='M28.782.002c2.03.002 3.193 1.12 3.182 3.106-.022 3.57.17 7.16-.158 10.7-1.09 11.773-14.588 18.092-24.6 11.573C2.72 22.458.197 18.313.057 12.937c-.09-3.36-.05-6.72-.026-10.08C.04 1.113 1.212.016 3.02.008 7.347-.006 11.678.004 16.006.002c4.258 0 8.518-.004 12.776 0zM8.65 7.856c-1.262.135-1.99.57-2.357 1.476-.392.965-.115 1.81.606 2.496a746.818 746.818 0 0 0 7.398 6.966c1.086 1.003 2.237.99 3.314-.013a700.448 700.448 0 0 0 7.17-6.747c1.203-1.148 1.32-2.468.365-3.426-1.01-1.014-2.302-.933-3.558.245-1.596 1.497-3.222 2.965-4.75 4.526-.706.715-1.12.627-1.783-.034a123.71 123.71 0 0 0-4.93-4.644c-.47-.42-1.123-.647-1.478-.844z' /></svg>
                  </span>
                  <span className='rrssb-text'>pocket</span>
                </a>
              </li>
            </ul>
            <p>
              <a href={config.siteTwitterUrl}>
                <br /> <strong>{config.siteAuthor}</strong> on Twitter
              </a>
            </p>
          </div>
        </div>
        <meta property='og:url' content={`fuckupsomecomics.com${path}`} />
        <meta property='og:type' content='article' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta name='twitter:site' value='@austinlanari' />
        <meta property='twitter:url' content={`fuckupsomecomics.com${path}`} />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:description' content={description} />
        <meta name='author' content='Austin Lanari' />
        <meta name='og:image' content={indexImage} />
        <meta name='twitter:image' content={indexImage} />
        <meta name='twitter:card' value='summary_large_image' />
        <script src="js/rrssb.min.js"></script>
      </div>
    )
  }
}

export default SitePost

