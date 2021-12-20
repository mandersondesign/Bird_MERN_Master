import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.less'
import MetaText from '../../MetaText'
import Rate from '../Rate'

class Footer extends React.Component {
  state = {
    iconHover: false,
  }

  onBookmarkHover = () => {
    this.setState({ iconHover: true })
  }

  onBookmarkOver = () => {
    this.setState({ iconHover: false })
  }

  render () {
    const { meta, rate, author } = this.props

    return (
      <div className={styles.footer}>
        {author && <div className={styles.footerAuthor}>{author}</div>}
        {meta && (
          <div className={styles.footerAuthorBlock}>
            {rate && <MetaText text={meta} delimiter=' ' component={<Rate rate={rate} />} />}
            {!rate && <MetaText text={meta} delimiter=' ' />}
          </div>
        )}
      </div>
    )
  }
}

Footer.propTypes = {
  meta: PropTypes.arrayOf(PropTypes.string),
  rate: PropTypes.string,
  author: PropTypes.string,
}

Footer.defaultProps = {
  meta: [],
  isSubscribe: false,
  rate: '',
  onSubscribe: () => {},
  author: '',
}

export default Footer
