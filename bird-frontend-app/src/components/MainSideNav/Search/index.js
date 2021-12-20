import React, { useState, memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  searchOfAthlete,
  searchOfWorkout,
  searchAll,
} from 'modules/sidenav/sidenav-actions'

import { AutoComplete } from 'antd'
import { prepareSearchInputs } from 'components/dashboard/utils'
import { EcoFormInput } from 'components/index'
import { throttle } from 'lodash'
import css from './index.less'
import { useSearchAthletes } from './useSearchAthletes'

const { Option, OptGroup } = AutoComplete

const dataTemplate = {
  athletes: {
    title: 'ATHLETES',
    children: [
      {
        id: 'u-0',
        title: 'No athletes found',
      },
    ],
  },
  planTemplates: {
    title: 'PLAN TEMPLATES',
    children: [
      {
        id: 'p-0',
        title: 'No plan templates found',
      },
    ],
  },
  workouts: {
    title: 'WORKOUTS',
    children: [
      {
        id: 'w-0',
        title: 'No workouts found',
      },
    ],
  },
}

const Search = () => {
  const [focused, setFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [dataSource, setDataSource] = useState({})
  const { search } = useSelector(({ sidenav }) => sidenav)

  const dispatch = useDispatch()
  const history = useHistory()

  const { filterListAthletes, resetPageAthletes } = useSearchAthletes()

  useEffect(() => {
    setIsOpen(focused && search.length >= 3)
  }, [search, focused])

  const onChange = e => {
    setDataSource(dataTemplate)
    const value = e?.trim()
    dispatch(searchOfAthlete(e))

    if (value.length >= 3) {
      dispatch(searchAll(value, dataTemplate)).then(res => {
        if (res) {
          setDataSource(res)
        } else {
          setDataSource(dataTemplate)
        }
      })
    }
    if (value.length === 0) {
      resetPageAthletes()
    }
  }

  const onSelect = e => {
    const spl = e.split('-')
    const category = spl[0]
    const id = spl[1]
    if (+id === 0) {
      dispatch(searchOfAthlete(''))
    } else if (category === 'u') {
      filterListAthletes(id)
      // const user =
      //   dataSource.athletes.children.find(i => i.userId === +id) || {}
      // dispatch(getAthleteProfile(id))
      // if (user?.plan) {
      //   history.replace(`/athletes/${id}/plan`)
      // } else {
      //   history.replace(`/athletes/${id}/profile`)
      // }
    } else if (category === 'p') {
      history.replace(`/my_library/${id}/plan_template`)
    } else if (category === 'w') {
      const workout = dataSource.workouts.children.find(
        i => i.workoutLibraryId === +id,
      )
      history.replace('/my_library/workout_library')
      dispatch(searchOfWorkout(workout?.workoutLibraryId))
    }
    // dispatch(searchOfAthlete(''))
    setIsOpen(false)
    setFocused(false)
  }

  const onFocus = () => {
    setFocused(true)
    onChange(search)
  }

  const onBlur = () => {
    setFocused(false)
    setIsOpen(false)
  }

  const renderInput = (props, i) => <EcoFormInput key={i} {...props} />

  const options = Object.entries(dataSource).map(o => (
    <OptGroup
      className='mainTitle'
      key={o[1].title}
      label={<span>{o[1].title}</span>}
    >
      {o[1].children.map(group => (
        <Option
          key={group.id}
          value={group.id}
          disabled={group.id.split('-')[1] === '0'}
        >
          {group.title}
          <span className='certain-search-item-count'>{group.count}</span>
        </Option>
      ))}
    </OptGroup>
  ))

  return (
    <AutoComplete
      dropdownClassName='certain-category-search-dropdown'
      onChange={throttle(onChange, 500)}
      className={css.certainCategorySearch}
      size='large'
      value={search}
      open={isOpen}
      onFocus={onFocus}
      onBlur={onBlur}
      onSelect={onSelect}
      dataSource={options}
      placeholder='Search'
    >
      {prepareSearchInputs.map(renderInput)}
    </AutoComplete>
  )
}

export default memo(Search)
