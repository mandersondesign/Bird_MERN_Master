import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Icon from '../Icon'
import css from './index.less'

const TITLE_ITEM_OFFSET = 85
const TITLE_ITEM_WIDTH = 120
const TITLE_ITEM_MARGIN = 50
const TITLE_MOVE_SPEED = 20

const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () => isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows(),
}
const windowWidth = () => window.innerWidth

class TagSlider extends React.Component {
  state = {
    selectedItem: this.props.startItem,
    dots: this.getDots(this.props.items),
    styles: {
      titles: {
        width: 3000,
        left: -TITLE_ITEM_OFFSET,
        transition: 'none',
      },
    },
    startPoint: null,
  }

  componentDidMount () {
    const { startItem } = this.props
    if (!isMobile.any()) {
      window.addEventListener('resize', this.onResize)
      setTimeout(() => {
        this.setLeftOffset(startItem)
        this.titlesElem.addEventListener('mouseenter', this.beginTracingMouse)
        this.titlesElem.addEventListener('mouseleave', this.endTracingMouse)
      })
    }
  }

  UNSAFE_componentWillUpdate (nextProps) {
    const { startItem } = this.props
    if (nextProps.startItem !== startItem) {
      if (!isMobile.any()) {
        this.setLeftOffset(nextProps.startItem)
      } else {
        this.setState({ selectedItem: nextProps.startItem })
      }
    }
  }

  componentWillUnmount () {
    if (!isMobile.any()) {
      window.removeEventListener('resize', this.onResize)
      this.titlesElem.removeEventListener('mouseenter', this.beginTracingMouse)
      this.titlesElem.removeEventListener('mouseleave', this.endTracingMouse)
    }
  }

  onResize = () => {
    const { selectedItem } = this.state
    this.setLeftOffset(selectedItem)
  }

  getDots = items => {
    const dist = 100 / (items.length - 1)
    return items.map((el, i) => ({ left: `calc(${dist * i}% - 10px)` }))
  }

  setLeftOffset = i => {
    const { items } = this.props
    const dotsDist = this.dotElems.getBoundingClientRect().width / (items.length - 1)
    const currentState = { ...this.state }
    const titlesLeftOffset = dotsDist * i - (TITLE_ITEM_WIDTH + TITLE_ITEM_MARGIN) * i - TITLE_ITEM_OFFSET

    currentState.selectedItem = i
    currentState.styles.titles.left = titlesLeftOffset
    currentState.selectedItem = i
    currentState.styles.titles.transition = 'left 0.4s cubic-bezier(0.68, 0.55, 0.265, 1.25)'
    this.setState(currentState)
  }

  setSliderLeftOffset = offset => {
    const currentState = { ...this.state }
    const { items } = this.props
    const widthTitles = (TITLE_ITEM_WIDTH + TITLE_ITEM_MARGIN) * items.length + windowWidth() * 0.2
    const extremePoints = {
      left: -TITLE_ITEM_OFFSET,
      right: windowWidth() * 0.8 - widthTitles + TITLE_ITEM_OFFSET - TITLE_ITEM_MARGIN / 2,
    }

    let titlesLeftOffset = currentState.styles.titles.left + offset

    if (titlesLeftOffset >= extremePoints.left) {
      titlesLeftOffset = extremePoints.left
    }
    if (titlesLeftOffset < extremePoints.right) {
      titlesLeftOffset = extremePoints.right
    }

    currentState.styles.titles.transition = 'none'
    currentState.styles.titles.left = titlesLeftOffset

    this.setState(currentState)
  }

  selectItem = (ev, i) => {
    const { onAction } = this.props
    this.setLeftOffset(i)
    onAction(i)
  }

  selectMobileItem = (ev, i) => {
    const { onAction } = this.props
    this.setState({ selectedItem: i })
    onAction(i)
  }

  dotHover = (i, mode) => {
    const dotElems = document.querySelectorAll('.dot')
    dotElems[i].style.transform = mode === 'on' ? 'scale(2.8)' : 'scale(1)'
  }

  beginTracingMouse = ev => {
    this.setState({ startPoint: ev.clientX })
    this.titlesElem.addEventListener('mousemove', this.tracingMouse)
  }

  endTracingMouse = () => {
    const { selectedItem } = this.state
    this.titlesElem.removeEventListener('mousemove', this.tracingMouse)
    this.setLeftOffset(selectedItem)
  }

  tracingMouse = ev => {
    const { startPoint } = this.state
    const currentOffset = startPoint - ev.clientX
    if (Math.abs(currentOffset) < 20) { return }

    const part = {
      left: startPoint - 0,
      right: windowWidth() - startPoint,
    }

    const calcOffset = (currentOffset > 0) ? currentOffset / part.left * TITLE_MOVE_SPEED : currentOffset / part.right * TITLE_MOVE_SPEED

    this.setSliderLeftOffset(calcOffset)
  }

  render () {
    const { items, style, className } = this.props
    const { styles, dots, selectedItem } = this.state
    const rootClass = cn(
      css.root,
      className,
      { [css.rootResponsive]: isMobile.any() },
    )
    const titleStyles = { ...styles.titles }
    const dotsStyles = dots.slice()

    return (
      <div className={rootClass} style={style}>
        {!isMobile.any() && (
          <div className={css.rootTitles} ref={el => { this.titlesElem = el }} style={{ ...titleStyles }}>
            {items.map((el, i) => {
              const titleClass = cn(css.rootTitlesItem, { [css.rootTitlesItemActive]: i === selectedItem })
              return (
                <div
                  key={Date.now()}
                  type='button'
                  className={titleClass}
                  onClick={ev => this.selectItem(ev, i)}
                  onMouseEnter={() => this.dotHover(i, 'on')}
                  onMouseLeave={() => this.dotHover(i, 'out')}
                >
                  <div className={css.rootTitlesItemIcon}>
                    <Icon
                      svg
                      type={el.icon}
                      size={60}
                      {...(i === selectedItem ? { grad: true } : {})}
                    />
                  </div>
                  <div className={css.rootTitlesItemText}>{el.name}</div>
                </div>
              )
            })}
          </div>
        )}
        {isMobile.any() && (
          <table className={css.rootTitlesMobile}>
            <tbody>
              <tr>
                {items.map((el, i) => {
                  const titleClass = cn(css.rootTitlesMobileItem, { [css.rootTitlesMobileItemActive]: i === selectedItem })
                  return (
                    <td key={Date.now()}>
                      <div className={titleClass} onClick={ev => this.selectMobileItem(ev, i)}>
                        <div className={css.rootTitlesMobileItemIcon}>
                          <Icon
                            svg
                            type={el.icon}
                            size={60}
                          />
                        </div>
                        <div className={css.rootTitlesMobileItemText}>
                          {el.name}
                        </div>
                      </div>
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>
        )}
        {!isMobile.any() && (
          <div className={css.rootDots} ref={el => { this.dotElems = el }}>
            {items.map((el, i) => {
              const dotClass = cn(css.rootDotsItem, 'dot', { [css.rootDotsItemActive]: i === selectedItem })
              return (
                <span
                  key={Date.now()}
                  type='button'
                  className={dotClass}
                  style={dotsStyles[i]}
                  onClick={ev => this.selectItem(ev, i)}
                  onMouseEnter={() => this.dotHover(i, 'on')}
                  onMouseLeave={() => this.dotHover(i, 'out')}
                />
              )
            })}
          </div>
        )}
      </div>
    )
  }
}

TagSlider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  startItem: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  onAction: PropTypes.func,
}

TagSlider.defaultProps = {
  items: [{}],
  startItem: 0,
  style: {},
  className: '',
  onAction: () => {},
}

export default TagSlider
