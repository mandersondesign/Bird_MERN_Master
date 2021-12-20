import React, { memo } from 'react'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { IconBadge } from 'components/index'
import c from 'classnames'
import css from './index.less'

const Item = memo(({ name, amount, title, isActive, planTemplateId }) => {
  const { pathname } = useLocation()
  const history = useHistory()

  const goTo = url => url !== pathname && history.push(url)

  const handlerHistory = () => {
    const obj = {
      'my athletes': () => {
        const link = name === 'Unassigned' ? '/unassigned' : ''
        goTo(`/athletes${link}`)
      },
      'active plans': () => goTo(`/plan_template/${planTemplateId}/athletes`),
      'my library': () => {
        const link = name === 'Workouts' ? 'workout_library' : 'plan_templates'
        goTo(`/my_library/${link}`)
      },
    }

    obj[title]()
  }

  const getIsActiveItem = () => {
    const id = pathname.split('/')[2]

    if (title === 'my library') {
      if (pathname === '/my_library/plan_templates' && isActive === name) return true
      if (pathname === '/my_library/workout_library' && isActive === name) return true
      if (pathname === `/my_library/${id}/plan_template` && name === 'Plan templates') return true
    } else if (title === 'active plans') {
      if (pathname === `/plan_template/${planTemplateId}/athletes`) return true
    } else if (title === 'my athletes') {
      if (isActive === name) return true
    }
  }

  const isActiveItem = getIsActiveItem()

  return (
    <div
      className={c(css.item, { [css.activeItem]: isActiveItem })} onClick={handlerHistory}
    >
      <div className={css.name}>{name}</div>
      <div className={css.amount}>{amount}</div>
    </div>
  )
})

const Section = memo(({ title, icon, items, isActive }) => {
  return (
    <div className={css.section}>
      <div className={css.title}>
        <IconBadge name={icon} />
        <div className={css.text}>{title}</div>
      </div>

      <div className={css.items}>
        {items.map(i => <Item key={i.name} title={title} isActive={isActive} {...i} />)}
      </div>
    </div>
  )
})

const Sections = ({ sections }) => {
  const { pathname } = useLocation()
  const { planTemplateId } = useParams()

  const obj = {
    '/athletes': 'All Athletes',
    '/athletes/unassigned': 'Unassigned',
    '/my_library/plan_templates': 'Plan templates',
    '/my_library/workout_library': 'Workouts',
    '/library': planTemplateId,
  }

  const isActive = obj[pathname] || obj['/library']

  return (
    <div className={css.sections}>
      {sections.map(i => <Section key={i.title} isActive={isActive} {...i} />)}
    </div>
  )
}

export default memo(Sections)
