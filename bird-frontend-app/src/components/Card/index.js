import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { NavLink } from 'components'
import styles from './styles.less'
import Header from '../../common-ui/CardHeaderHover'
import HeaderImage from '../../common-ui/CardHeaderImg'
import Footer from './Footer'
import Content from './Content'
import Aside from './Aside'

class Card extends React.Component {
  state = {
    isHover: false,
  }

  onHover = () => {
    this.props.onMouseEnter(!this.state.isHover)
    this.setState({ isHover: !this.state.isHover })
  }

  outHover = () => {
    this.props.onMouseLeave(!this.state.isHover)
    this.setState({ isHover: !this.state.isHover })
  }

  render () {
    const {
      type,
      header,
      content,
      footer,
      component,
      status,
      aside,
      className,
      onSubscribe,
      isSubscribe,
      cardUrl,
      parent,
    } = this.props
    let containerClass = styles[type.position]
    let wrapperClass = status === 'visited'
      ? cn(styles.cardWrapper, styles.cardVisited)
      : styles.cardWrapper

    if (type) {
      switch (type.height) {
      case 'events-small':
        containerClass = cn(containerClass, styles.cardEventsSmall)
        break
      case 'events-big':
        containerClass = cn(containerClass, styles.cardEventsBig)
        break
      default:
        break
      }
    }

    wrapperClass = cn(wrapperClass, containerClass)
    wrapperClass = cn(wrapperClass, className)

    if (cardUrl.indexOf('://') !== -1) {
      return (
        <a href={cardUrl} target='blank' className={wrapperClass} onMouseEnter={this.onHover} onMouseLeave={this.outHover}>{component.header}
          {!component.header && header && header.url && type.label !== 'test' && type.position !== 'horizontalFull' && (
            <Header overlay={this.state.isHover} {...header} position={type.position} parent={parent} />
          )}
          <div className={styles.card}>
            {component.aside}
            {!component.aside && aside && <Aside {...aside} title={content.title} />}
            <div className={styles.cardContent}>
              {component.content}
              {!component.content && type.label !== 'test' && type.position !== 'horizontalFull' && <Content type={type} content={content} />}
              {!component.content && (type.label === 'test' || type.position === 'horizontalFull') && (
                <Content type={type} content={content} url={header.url} />
              )}
              {footer && component.footer}
              {footer && !component.footer && (
                <Footer {...footer} onSubscribe={onSubscribe} isSubscribe={isSubscribe} />
              )}
            </div>
          </div>
        </a>
      )
    }

    return (
      <NavLink to={cardUrl} className={wrapperClass} onMouseEnter={this.onHover} onMouseLeave={this.outHover}>
        {component.header}
        {!component.header && header && header.url && type.label !== 'test' && type.label !== 'service' && type.position !== 'horizontalFull' && (
          <Header overlay={this.state.isHover} {...header} position={type.position} parent={parent} />
        )}
        {!component.header && type.label === 'service' && <HeaderImage {...header} card='simple' alt={content.title} />}
        <div className={styles.card}>
          {component.aside}
          {!component.aside && aside && <Aside {...aside} title={content.title} />}
          <div className={styles.cardContent}>
            {component.content}
            {!component.content && type.label !== 'test' && type.position !== 'horizontalFull' && <Content type={type} content={content} />}
            {!component.content && (type.label === 'test' || type.position === 'horizontalFull') && (
              <Content type={type} content={content} url={header.url} />
            )}
            {footer && component.footer}
            {footer && !component.footer && (
              <Footer {...footer} onSubscribe={onSubscribe} isSubscribe={isSubscribe} />
            )}
          </div>
        </div>
      </NavLink>
    )
  }
}

Card.propTypes = {
  type: PropTypes.shape({
    text: PropTypes.string,
  }),
  aside: PropTypes.shape({
    url: PropTypes.string,
  }),
  header: PropTypes.shape({
    url: PropTypes.string,
  }),
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    block: PropTypes.shape({
      status: PropTypes.oneOf(['pay', 'free', 'done', 'progress']),
      text: PropTypes.string,
    }),
  }),
  footer: PropTypes.shape({
    author: PropTypes.string,
  }),
  status: PropTypes.string,
  component: PropTypes.object,
  className: PropTypes.string,
  onSubscribe: PropTypes.func,
  isSubscribe: PropTypes.bool,
  cardUrl: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
}

Card.defaultProps = {
  type: {},
  aside: null,
  header: {},
  content: {},
  footer: {},
  component: {},
  status: '',
  className: '',
  onSubscribe: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  isSubscribe: false,
  cardUrl: '#',
}

export default Card
