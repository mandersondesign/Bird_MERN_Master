import React, { PureComponent } from 'react'
import { array, func } from 'prop-types'

import { Popover as AntPopover } from 'components'
import { SortingMenu } from 'components/CustomMenu'

import bem from 'utils/bem'
import { ElementPropTypes } from 'utils/prop-types'
import { filter } from 'utils/props'
import { AthleteInviteForm } from '../AthleteInviteForm'

import './AthletesControlPanel.scss'
import AthletesModal from '../AthletesModal'
import { HasAthletes } from '../../../../wrappers'
import { ModalButton } from './styled'

const SORTING_DEFAULT = [
  {
    name: 'messages',
    title: 'Latest Messages ',
    direction: 'desc',
  },
  {
    name: 'messages',
    title: 'Oldest Messages ',
    direction: 'asc',
  },
  {
    name: 'activity',
    title: 'Latest Activity',
    direction: 'desc',
  },
  {
    name: 'activity',
    title: 'Oldest Activity',
    direction: 'asc',
  },
  {
    name: 'name',
    title: 'Sort by Name (A-Z)',
    direction: 'asc',
  },
  {
    name: 'name',
    title: 'Sort by Name (Z-A)',
    direction: 'desc',
  },
]

export const AthletesControlPanelPropTypes = {
  ...ElementPropTypes,
  items: array.isRequired,
  onSorted: func.isRequired,
}

export const AthletesControlPanelDefaultProps = {
  items: SORTING_DEFAULT,
  onSorted: () => {},
}

export class AthletesControlPanel extends PureComponent {
  static propTypes = { ...AthletesControlPanelPropTypes }

  static defaultProps = { ...AthletesControlPanelDefaultProps }

  static className = 'AthletesControlPanel'

  static SORTING_DEFAULT = SORTING_DEFAULT

  state = {
    visible: false,
    isModalVisible: false,
  }

  onVisible = visible => () => this.setVisible(visible)

  setVisible = visible => this.setState({ visible })

  openModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isModalVisible: !prevState.isModalVisible,
    }))
  }

  closeModal = () => {
    this.setState({
      isModalVisible: false,
    })
  }

  render () {
    const { visible, isModalVisible } = this.state
    const { items, onSorted, getUsers = () => {}, ...props } = this.props
    return (
      <div className={bem.block(this)} {...filter(props, ElementPropTypes)}>
        <SortingMenu items={items} onClick={onSorted} />
        <div
          style={{
            flexDirection: 'row',
            display: 'flex',
            alignSelf: 'flex-end',
          }}
        >
          <HasAthletes>
            <ModalButton onClick={this.openModal}>NEW MESSAGE</ModalButton>
          </HasAthletes>

          <AntPopover
            // arrowPointAtCenter
            trigger='click'
            content={
              <AthleteInviteForm
                getUsers={getUsers}
                onVisible={this.onVisible}
              />
            }
            placement='bottomRight'
            visible={visible}
            onVisibleChange={this.setVisible}
          >
            <ModalButton inviteAthlete onClick={this.onVisible(true)}>
              ADD ATHLETE
            </ModalButton>
          </AntPopover>
        </div>
        <AthletesModal
          isModalVisible={isModalVisible}
          closeModal={this.closeModal}
        />
      </div>
    )
  }
}
