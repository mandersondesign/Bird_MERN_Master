/* eslint-disable react/prefer-stateless-function, global-require */
/* Class important for DotDotDot component https://github.com/CezaryDanielNowak/React-dotdotdot/issues/10 */
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Dotdotdot from 'react-dotdotdot'
import styles from './styles.less'
import CardBlock from '../../../common-ui/CardBlock'
import CardType from '../../../common-ui/CardType'

class Content extends React.Component {
  render () {
    const { url, type, content } = this.props
    let typeClass = styles[type.label]
    const style = url ? { background: `url(${url}) no-repeat center`, backgroundSize: 'cover' } : {}

    typeClass = type.label !== 'test'
      ? cn(typeClass, styles.cardContent)
      : cn(typeClass, styles.cardContentTestcard)
    typeClass = content.status === 'promo' ? cn(typeClass, styles.cardContentPromo) : typeClass
    typeClass = cn(typeClass, styles[type.position])

    return (
      <div className={typeClass} style={style}>
        {type && <CardType label={type.label} text={type.text} position={type.position} />}
        {type && (
          <Dotdotdot clamp={3} className={styles.cardTitle}>
            {content.title}
          </Dotdotdot>
        )}
        {content && type.position !== 'horizontal' && content.description && (
          <Dotdotdot clamp={5} className={styles.cardDescription}>
            {content.description}
          </Dotdotdot>
        )}
        {content.block && <CardBlock {...content.block} position={type.position} />}
      </div>
    )
  }
}

Content.propTypes = {
  type: PropTypes.shape({
    label: PropTypes.oneOf([
      'solution',
      'article',
      'test',
      'service',
      'trajectorie',
      'course',
      'curatorcourse',
    ]),
    position: PropTypes.oneOf([
      'horizontalFull',
      'vertical',
      'horizontal',
      'horizontalBig',
      'horizontalCenter',
      'horizontalBiggest',
    ]),
  }),
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    block: PropTypes.shape({
      status: PropTypes.oneOf(['pay', 'free', 'done', 'progress']),
      text: PropTypes.string,
    }),
  }),
  url: PropTypes.string,
}

Content.defaultProps = {
  type: {},
  content: {},
  url: '',
}

export default Content
