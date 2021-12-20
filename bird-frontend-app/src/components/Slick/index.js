import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import css from './styles.less'
import Icon from '../Icon'

const defaultOptions = {
  infinite: true,
  centerMode: false,
  slidesToScroll: 1,
  slidesToShow: 4,
  arrows: false,

  responsive: [
    { breakpoint: 1, settings: { slidesToShow: 1 } },
    { breakpoint: 500, settings: { slidesToShow: 1 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
  ],
}

export default class Slick extends React.Component {
  static propTypes = {
    options: PropTypes.object,
    children: PropTypes.array,
  }

  static defaultProps = {
    options: {},
    children: [],
  }

  state = {
    slideId: this.props.options.initialSlide ? this.props.options.initialSlide : 0,
    options: { ...defaultOptions, ...this.props.options },
  }

  componentDidMount () {
    window.addEventListener('resize', this.onResize)
    // https://github.com/akiran/react-slick/issues/809
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 150)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    const winWidth = window.innerWidth
    const currentState = { ...this.state }
    for (const item of currentState.options.responsive) {
      if (winWidth < item.breakpoint) {
        currentState.options.slidesToShow = item.settings.slidesToShow
        break
      }
    }
    if (winWidth >= currentState.options.responsive[currentState.options.responsive.length - 1].breakpoint) {
      currentState.options.slidesToShow = this.props.options.slidesToShow ? this.props.options.slidesToShow : 4
    }

    this.setState(currentState)
  }

  next = () => {
    const { children } = this.props
    const { slideId, options } = this.state

    if (options.infinite) {
      this.slider.slickNext()
    } else if (slideId < children.length - options.slidesToShow) {
      this.slider.slickNext()
    }
  }

  previous = () => {
    const { slideId, options } = this.state

    if (options.infinite) {
      this.slider.slickPrev()
    } else if (slideId > 0) {
      this.slider.slickPrev()
    }
    this.slider.slickPrev()
  }

  handlerAfterChange = id => {
    this.setState({ slideId: id })
  }

  renderChildren = () => {
    const { children } = this.props
    return React.Children.map(children, e => <div className={css.item}>{React.cloneElement(e, { parent: 'slider' })}</div>)
  }

  render () {
    const { options } = this.state

    return (
      <div className={css.root}>
        <Slider
          ref={c => { this.slider = c }}
          afterChange={this.handlerAfterChange}
          {...options}
        >
          {this.renderChildren()}
        </Slider>
        {(options.infinite || (!options.infinite && this.state.slideId !== 0)) && (
          <button className={css['prev-button']} onClick={this.previous}>
            <Icon type='slickLeftArrow' svg />
          </button>
        )}
        {(options.infinite || (!options.infinite && this.state.slideId < (this.props.children.length - options.slidesToShow))) && (
          <button className={css['next-button']} onClick={this.next}>
            <Icon type='slickRightArrow' svg />
          </button>
        )}
      </div>
    )
  }
}

Slick.defaultProps = {
  options: {
    infinite: true,
  },
}
