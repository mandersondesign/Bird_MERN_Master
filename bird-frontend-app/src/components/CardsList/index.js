import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Col } from '..'
import styles from './styles.less'

const randomItem = cols => {
  const items = cols > 2 ? [
    styles.topRight,
    styles.topLeft,
    styles.middleRight,
    styles.middleLeft,
    styles.bottomRight,
    styles.bottomLeft,
  ] : [
    styles.topRight,
    styles.topLeft,
    styles.middleRight,
    styles.middleLeft,
    styles.bottomRight,
    styles.bottomLeft,
    styles.top,
    styles.middle,
    styles.bottom,
  ]

  return items[Math.floor(Math.random() * items.length)]
}

const CardsList = ({ children, cols, big, horizontal, vertical, random }) => {
  // console.log(cols * 4 - (React.Children.count(children) + (big ? 3 : 0)))
  let divClass = !random
    ? cn(
      { [styles.topRight]: horizontal === 'top' && vertical === 'right' },
      { [styles.topLeft]: horizontal === 'top' && vertical === 'left' },
      { [styles.middleRight]: horizontal === 'middle' && vertical === 'right' },
      { [styles.middleLeft]: horizontal === 'middle' && vertical === 'left' },
      { [styles.bottomRight]: horizontal === 'bottom' && vertical === 'right' },
      { [styles.bottomLeft]: horizontal === 'bottom' && vertical === 'left' },
      { [styles.top]: horizontal === 'top' && !vertical },
      { [styles.middle]: horizontal === 'middle' && !vertical },
      { [styles.bottom]: horizontal === 'bottom' && !vertical },
    )
    : randomItem(cols)

  divClass = cn(divClass, styles[`col${cols}`])
  divClass = big || big === 0 ? cn(divClass, styles.withbig) : cn(divClass, styles.without)

  const childrenArray = React.Children.toArray(children)

  if (!children) {
    return null
  }

  if (!children.some(e => e)) {
    return null
  }

  if (!children.length) {
    return null
  }
  const bigElement = childrenArray.splice(big, 1)
  childrenArray.unshift(bigElement[0])

  return (
    <div className={divClass}>
      {React.Children.map(childrenArray, (child, i) => (
        <Col className={(big || big === 0) && i === 0 ? styles.big : ''}>
          {React.cloneElement(child, {
            size: i === 0 ? 'big' : 'small',
          })}
        </Col>
      ))}
    </div>
  )
}

CardsList.propTypes = {
  children: PropTypes.array,
  cols: PropTypes.number.isRequired,
  big: PropTypes.number,
  horizontal: PropTypes.oneOf(['top', 'middle', 'bottom']),
  vertical: PropTypes.oneOf(['left', 'right']),
  random: PropTypes.bool,
}

CardsList.defaultProps = {
  big: null,
  horizontal: null,
  vertical: null,
  random: false,
  children: [],
}

export default CardsList
