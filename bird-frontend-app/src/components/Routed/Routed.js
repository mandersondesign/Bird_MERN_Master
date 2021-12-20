import { element } from 'prop-types'
import { Children, cloneElement, PureComponent } from 'react'
import { matchPath, withRouter } from 'react-router'
import { isElement } from 'react-is'

export const RoutedPropTypes = {
  children: element,
}

export const RoutedDefaultProps = {
  children: undefined,
}

export const Routed = withRouter(
  class Routed extends PureComponent {
    static propTypes = {
      ...RoutedPropTypes,
    };

    static defaultProps = {
      ...RoutedDefaultProps,
    };

    renderElement (element) {
      const { to, strict, exact } = element.props
      const { location } = this.props

      const path = typeof to === 'object' ? to.pathname : to
      const active = path ? matchPath(location.pathname, { path, exact, strict }) !== null : false

      return cloneElement(element, { active })
    }

    render () {
      const { children } = this.props
      const element = Children.only(children)

      return isElement(element) ? this.renderElement(element) : element
    }
  },
)
