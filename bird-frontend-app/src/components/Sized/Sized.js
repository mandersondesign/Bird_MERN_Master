import { element, oneOf } from 'prop-types'
import { isElement } from 'react-is'
import { Children, cloneElement, PureComponent } from 'react'
import bem from 'utils/bem'

const SIZE_SMALL = 'small'
const SIZE_MEDIUM = 'medium'
const SIZE_LARGE = 'large'

const SIZES = [SIZE_SMALL, SIZE_MEDIUM, SIZE_LARGE]

export const SizedPropTypes = {
  size: oneOf(SIZES),
  children: element,
}

export const SizedDefaultProps = {
  size: null,
}

export class Sized extends PureComponent {
  static propTypes = {
    ...SizedPropTypes,
  };

  static defaultProps = {
    ...SizedDefaultProps,
  };

  static className = 'Sized';

  static SIZE_SMALL = SIZE_SMALL;

  static SIZE_MEDIUM = SIZE_MEDIUM;

  static SIZE_LARGE = SIZE_LARGE;

  static SIZES = SIZES;

  renderElement (element) {
    const { props: elementProps } = element
    const { size } = this.props
    const className = bem.block(this, { [size]: Boolean(size) }, elementProps.className)

    return cloneElement(element, { className })
  }

  render () {
    const { children } = this.props
    const element = Children.only(children)

    return isElement(element) ? this.renderElement(element) : element
  }
}
