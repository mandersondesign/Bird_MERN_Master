import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Popover, Menu, Dropdown } from 'antd'
import { Button } from 'components/CustomButton'
import { FormWorkout } from 'components'
import { Sprite } from 'components/Sprite'
import css from './index.less'

const { Item } = Menu

const dateSort = [
  {
    name: 'last_update',
    title: 'Sort by Last Update \u2191',
    direction: 'desc',
  },
  {
    name: 'last_update',
    title: 'Sort by Last Update \u2193',
    direction: 'asc',
  },
  {
    name: 'name',
    title: 'Sort by A-Z',
    direction: 'asc',
  },
  {
    name: 'name',
    title: 'Sort by Z-A',
    direction: 'desc',
  },
]

const CustomDropdown = ({ items = [], title = '' }) => {
  return (
    <Dropdown overlay={items} trigger={['click']} className={css.wrapperDropdown} overlayClassName='wrapperOverlay'>
      <div className={css.activeItem}>
        <div className={css.title}>{title}</div>
        <Sprite type='down' className={css.icon} />
      </div>
    </Dropdown>
  )
}

const Header = ({ onSorted, onSortedType, getWorkoutsList }) => {
  const [activeSort, setActiveSort] = useState(dateSort[0])
  const [activeType, setActiveType] = useState({ name: 0, title: 'Choose type' })
  const [visible, setVisible] = useState(false)
  const { workoutsTypes = [] } = useSelector(state => state.workouts)

  const clickPopoverNew = () => setVisible(!visible)
  const parentNode = React.useRef(null)

  const getWorkoutsTypes = () => {
    const types = [{ workoutTypeId: 0, name: 'Choose type' }, ...workoutsTypes]
    return types.map(i => ({ name: i.workoutTypeId, title: i.name }))
  }

  const clickSort = item => {
    setActiveSort(item)
    onSorted(item)
  }

  const clickType = item => {
    setActiveType(item)
    onSortedType(item)
  }

  const resetFilters = () => {
    setActiveSort(dateSort[0])
    setActiveType({ name: 0, title: 'Choose type' })

    onSorted(dateSort[0])
    onSortedType({ name: 0, title: 'Choose type' })
  }

  const menuSort = (
    <Menu>
      {dateSort?.map((i, ind) => (
        <Item key={ind} onClick={() => clickSort(i)} className={css.menuItem}>
          {i.title}
        </Item>
      ))}
    </Menu>
  )

  const menuType = (
    <Menu>
      {getWorkoutsTypes()?.map((i, ind) => (
        <Item key={ind} onClick={() => clickType(i)} className={css.menuItem}>
          {i.title}
        </Item>
      ))}
    </Menu>
  )

  return (
    <div className={css.headerWorkouts} ref={parentNode}>
      <div className={css.top}>
        <CustomDropdown items={menuSort} title={activeSort.title} />
        <CustomDropdown items={menuType} title={activeType.title} />
      </div>

      <Popover
        trigger='click'
        content={<FormWorkout updateVisible={clickPopoverNew} popupForLibrary resetSort={resetFilters} />}
        visible={visible}
        onVisibleChange={clickPopoverNew}
        overlayClassName={css.popoverFormWorkout}
        getPopupContainer={node => parentNode?.current ?? node?.parentNode}
        placement='bottomLeft'
      >
        <Button face={Button.FACE_PRIMARY} className={css.button}>add new</Button>
      </Popover>
    </div>
  )
}

export default Header
