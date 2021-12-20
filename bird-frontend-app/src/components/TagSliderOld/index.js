import React from 'react'
import Hammer from 'react-hammerjs'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Slider } from 'antd'

import Icon from '../Icon'
import css from './index.less'

const TITLE_ITEM_WIDTH = 170
const SLIDER_TITLES_CLASS = 'slider-titles'
const SLIDER_BODY_CLASS = 'slider-body'

const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () => isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows(),
}
class TagSlider extends React.Component {
  state = {
    currentItem: this.props.startItem,
    isMobile: !!isMobile.any(),
    titleStyle: { left: 0 },
  }

  componentDidMount () {
    const { startItem } = this.props
    window.addEventListener('resize', this.onResize)
    if (!isMobile.any()) {
      setTimeout(() => {
        const newTitleStyle = this.getTitleStyle(startItem)
        this.setState({ titleStyle: newTitleStyle })
      }, 50)
    } else {
      setTimeout(() => {
        const newTitleStyle = this.getTitleStyleMobile({ deltaX: null, item: startItem })
        this.setState({ titleStyle: newTitleStyle })
      }, 50)
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    const { currentItem } = this.state
    const newTitleStyle = this.getTitleStyle(currentItem)
    this.setState({ titleStyle: newTitleStyle })
  }

  onChange = value => {
    const newTitleStyle = isMobile.any()
      ? this.getTitleStyleMobile({ deltaX: null, item: value })
      : this.getTitleStyle(value)
    this.setState({
      currentItem: value,
      titleStyle: newTitleStyle,
    })
  }

  onPan = ev => {
    const param = {
      deltaX: ev.deltaX,
      item: null,
    }
    const newTitleStyle = this.getTitleStyleMobile(param)
    this.setState({ titleStyle: newTitleStyle })
  }

  setItem = i => {
    const { onAction } = this.props
    const newValue = Math.round(i)
    onAction(newValue)
    this.onChange(newValue)
  }

  getTitleStyle = i => {
    const { items } = this.props
    const sliderBodyElCoords = document.querySelector(`.${SLIDER_BODY_CLASS}`).getBoundingClientRect()
    const sliderBodyElWidth = sliderBodyElCoords.right - sliderBodyElCoords.left
    const distBetweenDots = sliderBodyElWidth * (1 / (items.length - 1))
    const leftOffset = distBetweenDots * i - TITLE_ITEM_WIDTH * i
    return { left: leftOffset }
  }

  getTitleStyleMobile = param => {
    const { titleStyle } = this.state
    const titlesElCoords = document.querySelector(`.${SLIDER_TITLES_CLASS}`).getBoundingClientRect()
    const titleElWidth = titlesElCoords.right - titlesElCoords.left
    let leftOffest = titleStyle.left

    if (!param.item) {
      leftOffest = titleStyle.left + param.deltaX / 5
    } else {
      leftOffest = -(param.item * TITLE_ITEM_WIDTH)
    }
    if (leftOffest > 0) {
      leftOffest = 0
    }
    if (leftOffest <= 2 * TITLE_ITEM_WIDTH - titleElWidth) {
      leftOffest = 2 * TITLE_ITEM_WIDTH - titleElWidth
    }

    return { left: leftOffest }
  }

  render () {
    const { items, className } = this.props
    const { isMobile, titleStyle, currentItem } = this.state
    const rootClass = cn(css.tagSlider, className)
    const lastItem = items.length - 1

    const marks = {}
    items.forEach((item, i) => {
      marks[i] = ''
    })

    return (
      <div className={rootClass}>
        {!isMobile && (
          <div style={{ position: 'relative', width: '100%' }}>
            <div
              className={css.tagSliderTitles.concat(` ${SLIDER_TITLES_CLASS}`)}
              style={titleStyle}
            >
              {items.map((el, i) => {
                const textCss = cn(
                  css.tagSliderTitlesItemText,
                  i === currentItem ? css.tagSliderTitlesItemTextSelect : '',
                )
                return (
                  <div
                    key={Date.now()}
                    type='button'
                    className={css.tagSliderTitlesItem}
                    onClick={() => this.setItem(i)}
                  >
                    <div className={css.tagSliderTitlesItemIcon}>
                      <Icon
                        svg
                        type={el.icon}
                        size={60}
                        {...(i === currentItem ? { grad: true } : {})}
                      />
                    </div>
                    <div className={textCss}>{el.name}</div>
                  </div>
                )
              })}
            </div>
            <div className={css.tagSliderBody.concat(` ${SLIDER_BODY_CLASS}`)}>
              <Slider
                tipFormatter={null}
                min={0}
                max={lastItem}
                included={false}
                marks={marks}
                step={0.01}
                defaultValue={currentItem}
                value={currentItem}
                onChange={this.onChange}
                onAfterChange={this.setItem}
              />
            </div>
          </div>
        )}

        {isMobile && (
          <div style={{ position: 'relative', width: '100%' }}>
            <Hammer onPan={this.onPan}>
              <div
                className={css.tagSliderTitles.concat(` ${SLIDER_TITLES_CLASS}`)}
                style={titleStyle}
              >
                {items.map((el, i) => {
                  const textCss = cn(
                    css.tagSliderTitlesItemText,
                    i === currentItem ? css.tagSliderTitlesItemTextSelect : '',
                  )
                  return (
                    <Hammer key={Date.now()} onTap={() => this.setItem(i)}>
                      <div role='button' className={css.tagSliderTitlesItem.concat(' tag-slider-item')}>
                        <div className={css.tagSliderTitlesItemIcon}>
                          <Icon
                            svg
                            type={el.icon}
                            size={60}
                            {...(i === currentItem ? { grad: true } : {})}
                          />
                        </div>
                        <div className={textCss}>{el.name}</div>
                      </div>
                    </Hammer>
                  )
                })}
              </div>
            </Hammer>
          </div>
        )}
      </div>
    )
  }
}

TagSlider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  startItem: PropTypes.number,
  className: PropTypes.string,
  onAction: PropTypes.func,
}

TagSlider.defaultProps = {
  items: [{}],
  startItem: 0,
  className: '',
  onAction: () => {},
}

export default TagSlider
