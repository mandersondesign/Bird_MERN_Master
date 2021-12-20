import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getAthletesMeta } from 'modules/sidenav/sidenav-actions'
import Sections from './Sections'
import Search from './Search'
import css from './index.less'

const getSection = (title, icon, items = []) => ({ title, icon, items: items })

const MainSideNav = () => {
  const { items: { athletes, plans, library } = {} } = useSelector(({ sidenav }) => sidenav)
  const dispatch = useDispatch()
  const history = useHistory()

  const sections = [
    getSection('my athletes', 'athleticShoe', athletes),
    getSection('active plans', 'manRunning', plans),
    getSection('my library', 'book', library),
  ]

  useEffect(() => {
    if (!library?.length) {
      dispatch(getAthletesMeta())
    }
  }, [library])

  const goToMain = () => history.push('/plan_template/0/athletes')

  return (
    <div className={css.mainSideNav}>
      <img alt='Right logo' src='/img/logo.svg' onClick={goToMain} className={css.logo} />

      <Search />

      <Sections sections={sections} />
    </div>
  )
}

export default memo(MainSideNav)
