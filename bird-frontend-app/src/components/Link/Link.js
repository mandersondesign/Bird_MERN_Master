import { Button } from 'components/CustomButton'
import { Iconed, IconedDefaultProps, IconedPropTypes } from 'components/CustomIcon'
import { Sized, SizedDefaultProps, SizedPropTypes } from 'components/Sized'
import { bool, node, oneOf } from 'prop-types'
import React, { PureComponent } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import bem from 'utils/bem'
import { RouterLinkPropTypes } from 'utils/prop-types'
import { filter, unprefixed } from 'utils/props'
import './Link.scss'

export const LinkPropTypes = {
  ...RouterLinkPropTypes,
  ...IconedPropTypes,
  ...SizedPropTypes,
  active: bool,
  button: bool,
  children: node,
  disabled: bool,
  face: oneOf(Button.FACES),
}

export const LinkDefaultProps = {
  ...IconedDefaultProps,
  ...SizedDefaultProps,
  active: false,
  button: false,
  disabled: false,
  face: undefined,
  size: Sized.SIZE_MEDIUM,
}

export class Link extends PureComponent {
  static propTypes = LinkPropTypes;

  static defaultProps = LinkDefaultProps;

  static className = 'Link';

  static FACE_DANGER = Button.FACE_DANGER;

  static FACE_DEFAULT = Button.FACE_DEFAULT;

  static FACE_PRIMARY = Button.FACE_PRIMARY;

  static FACE_SECONDARY = Button.FACE_SECONDARY;

  static FACES = Button.FACES;

  render () {
    const { active, button, disabled, face, rounded, size, ...props } = this.props
    const isActive = !!active
    const isFaced = !!face

    const className = button
      ? bem.block(this, null, bem.block(Button, { disabled, rounded, [face]: isFaced }))
      : bem.block(this, { active: isActive, [face]: isFaced })

    const iconClassName = button
      ? bem.element(Button, 'icon', null, props['icon-className'])
      : bem.element(this, 'icon', null, props['icon-className'])

    return (
      <Sized size={size}>
        <Iconed icon-size={size} {...filter(props, IconedPropTypes)} icon-className={iconClassName}>
          <RouterLink {...filter(unprefixed(props, 'icon'), RouterLinkPropTypes)} className={className} />
        </Iconed>
      </Sized>
    )
  }
}
