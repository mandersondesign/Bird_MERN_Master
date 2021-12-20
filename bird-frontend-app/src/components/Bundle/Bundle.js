import { func } from 'prop-types'
import { PureComponent } from 'react'

export const BundlePropTypes = {
  load: func.isRequired,
  children: func.isRequired,
}

export const BundleDefaultProps = {}

export class Bundle extends PureComponent {
  static propTypes = BundlePropTypes;

  static defaultProps = BundleDefaultProps;

  state = {
    mod: null,
  };

  componentWillMount () {
    const { load } = this.props

    load(mod => this.setState({ mod: mod.default ? mod.default : mod }))
  }

  render () {
    const { children } = this.props
    const { mod } = this.state

    return mod ? children(mod) : null
  }
}
