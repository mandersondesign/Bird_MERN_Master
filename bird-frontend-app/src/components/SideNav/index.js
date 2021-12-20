import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sessionSelector } from 'modules/session/session-selectors'
import { withRouter, NavLink } from 'react-router-dom'
import { Affix, Menu, AutoComplete } from 'antd'
import { throttledAction } from 'utils/basic'
import { getAthleteProfile } from 'modules/athlets/athlets-actions'
import { searchOfAthlete, searchOfWorkout } from 'modules/sidenav/sidenav-actions'

import cn from 'classnames'

import { prepareSearchInputs } from 'components/dashboard/utils'
import { EcoFormInput, IconBadge } from 'components/index'
import css from './styles.less'

import { search } from 'api'

const { Option, OptGroup } = AutoComplete

const MOBILE_BREAKPOINT = 667
const windowWidth = () => window.innerWidth
const renderItemCount = count => count && <div className={css['nav-count']}>{count}</div>

const renderBadge = icon => {
  if (!icon) return null

  return (
    <div className={css['nav-index']}>
      <IconBadge name={icon} />
    </div>
  )
}

const renderSubMenu = (items, menu, selectedKey) => (
  <Menu className={css.navSub}>
    {items.map(({ name, title, amount, onClick, planTemplateId }) => {
      const uri = name === 'All Athletes' ? '' : name.toLowerCase()

      let path = `/${menu}/${uri}`
      if (planTemplateId !== undefined) {
        path = `/plan_template/${planTemplateId}/athletes`
      }

      if (uri.includes('workouts')) {
        path = '/my_library/workout_library'
      }

      const isActive = () => path.replace(/ /ig, '_') === location.pathname

      return (
        <Menu.Item key={path}>
          <NavLink to={path.replace(/ /ig, '_')} onClick={onClick} className={css.navSubLink} style={{ color: isActive() ? '#000000' : '#B1B0AE' }}>
            <div className={css['nav-title']}>{!name.includes('_') ? name : title}</div>
            {renderItemCount(amount || '0')}
          </NavLink>
        </Menu.Item>
      )
    }, [menu, selectedKey])}
  </Menu>
)

const renderMenuItems = (selectedKey, menuItems, dataItems) => (
  menuItems.map(({ icon, menu, items, name, title, onClick }) => {
    let subItems

    if (items === undefined) {
      subItems = dataItems[name]
    } else {
      subItems = items
    }

    return (
      <Menu.Item className={css['nav-item']} key={name}>
        <NavLink to='#' onClick={onClick}>
          {renderBadge(icon)}
          <div className={css['nav-title']}>
            <div className={css['nav-title-inner']}>{title}</div>
          </div>
        </NavLink>
        {subItems && renderSubMenu(subItems, menu, selectedKey)}
      </Menu.Item>
    )
  })
)

function renderTitle (title) {
  return (
    <span>
      {title}
    </span>
  )
}

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

class SideNav extends React.Component {
  state = {
    isMobile: false,
    open: false,
    openedDropdown: false,
    searchValue: '',
    navStyle: {},
    dataSource: dataTemplate,
  }

  get items () {
    return [
      {
        menu: 'athletes',
        icon: 'athleticShoe',
        name: 'athletes',
        title: 'My Athletes',
        items: undefined,
      },
      {
        menu: 'active_plans',
        icon: 'manRunning',
        name: 'plans',
        title: 'Active Plans',
        items: undefined,
      },
      {
        menu: 'my_library',
        icon: 'book',
        name: 'library',
        title: 'My Library',
        items: undefined,
      },
    ]
  }

  componentDidMount () {
    const { getAthletesMeta } = this.props
    if (window.location.pathname !== '/' && !window.location.pathname.includes('signUp')) getAthletesMeta()
    this.onResize()
    window.addEventListener('resize', this.onResize)
    window.addEventListener('mousedown', this.handleClick, false)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('mousedown', this.handleClick, false)
  }

  renderInput = (props, i) => <EcoFormInput key={i} {...props} />

  onResize = throttledAction(() => {
    const isMobile = windowWidth() <= MOBILE_BREAKPOINT
    const isShow = !isMobile ? true : !!this.state.open
    this.setStyle(isMobile, isShow)
  })

  setStyle = (isMobile, isShow) => {
    const newStyles = { display: isShow ? 'block' : 'none' }
    this.setState({ isMobile, navStyle: newStyles })
  }

  // TODO: selectedKeys from outside should be deprecated in V1
  getSelectedKeys = () => {
    const { location: { hash, pathname }, selectedKeys } = this.props

    if (selectedKeys && selectedKeys.length) return selectedKeys
    return [pathname + hash]
  }

  handleClick = () => { }

  openSearchResults = () => {
    const { searchValue } = this.state

    if (searchValue.length >= 3) {
      this.setState({ openedDropdown: true })
    }
  }

  onSelect = e => {
    const { history: { replace }, getAthleteProfile, searchOfAthlete, searchOfWorkout } = this.props
    const { dataSource } = this.state
    const spl = e.split('-')
    const category = spl[0]
    const id = spl[1]

    if (+id === 0) {
      this.setState({ searchValue: '' })
      searchOfAthlete('')
    } else if (category === 'u') {
      const user = dataSource.athletes.children.find(i => i.userId === +id) || {}
      searchOfAthlete(user.name)
      getAthleteProfile(id)
      if (user?.plan) {
        replace(`/athletes/${id}/plan`)
      } else {
        replace(`/athletes/${id}/profile`)
      }

      this.setState({ searchValue: '', openedDropdown: false })
    } else if (category === 'p') {
      const plan = dataSource.planTemplates.children.find(i => i.planTemplateId === +id)
      replace(`/my_library/${id}/plan_template`)
      searchOfAthlete(plan.name)

      this.setState({ searchValue: '', openedDropdown: false })
    } else if (category === 'w') {
      const workout = dataSource.workouts.children.find(i => i.workoutLibraryId === +id)
      replace('/my_library/workout_library')
      searchOfAthlete(workout?.name)
      searchOfWorkout(workout?.workoutLibraryId)

      this.setState({ searchValue: '', openedDropdown: false })
    }
  }

  handleSearch = e => {
    const { searchOfAthlete } = this.props
    this.setState({ dataSource: dataTemplate, openedDropdown: false, searchValue: e })
    const { dataSource } = this.state
    searchOfAthlete(e)

    if (e.length < 3) {
      return false
    } else {
      this.setState({ openedDropdown: true })
    }

    try {
      search.getSearch(e).then(r => {
        const newDataSource = {
          ...dataSource,
          athletes: {
            ...dataSource.athletes,
            children: [
              {
                id: 'u-0',
                title: 'No athletes found',
              },
            ],
          },
          planTemplates: {
            ...dataSource.planTemplates,
            children: [
              {
                id: 'p-0',
                title: 'No plan templates found',
              },
            ],
          },
          workouts: {
            ...dataSource.workouts,
            children: [
              {
                id: 'w-0',
                title: 'No workouts found',
              },
            ],
          },
        }

        if (r.data.athletes.length) {
          newDataSource.athletes.children = r.data.athletes.map(o => ({ ...o, id: `u-${o.userId}`, title: o.name }))
        }

        if (r.data.planTemplates.length) {
          newDataSource.planTemplates.children = r.data.planTemplates.map(o => ({
            ...o, id: `p-${o.planTemplateId}`, title: o.name,
          }))
        }

        if (r.data.workouts.length) {
          newDataSource.workouts.children = r.data.workouts.map(o => ({
            ...o, id: `w-${o.workoutLibraryId}`, title: o?.name,
          }))
        }

        this.setState({ dataSource: newDataSource })
      })
    } catch (e) {
      this.setState({ dataSource: dataTemplate, openedDropdown: false })
    }
  }

  openNav = () => {
    const currentOpenState = !this.state.open
    this.setState({ open: currentOpenState })
    this.setStyle(this.state.isMobile, currentOpenState)
  }

  renderMenu = () => {
    const { openedDropdown, dataSource } = this.state
    const { withCount, meta: { items, search } } = this.props
    const menuClassName = cn(css.navbar, { [css.navMenuWithCount]: withCount })
    const selectedKeys = this.getSelectedKeys()

    const options = Object.entries(dataSource).map(o => (
      <OptGroup className='mainTitle' key={o[1].title} label={renderTitle(o[1].title)}>
        {o[1].children.map(group => (
          <Option key={group.id} value={group.id}>
            {group.title}
            <span className='certain-search-item-count'>{group.count}</span>
          </Option>
        ))}
      </OptGroup>
    ))

    return (
      <div className={css.sidenav}>
        <div className={css.logo}>
          <NavLink to='/plan_template/0/athletes' className={css.button}>
            <img alt='Right logo' src='/img/logo.svg' className={css.logoCoachImage} />
          </NavLink>
        </div>

        <div className={css.search} ref={node => { this.node = node }}>
          <AutoComplete
            className='certain-category-search'
            dropdownClassName='certain-category-search-dropdown'
            size='large'
            style={{ width: 210 }}
            value={search}
            open={openedDropdown}
            onFocus={this.openSearchResults}
            onChange={this.handleSearch}
            onSelect={this.onSelect}
            dataSource={options}
            placeholder='Search'
          >
            {prepareSearchInputs.map(this.renderInput)}
          </AutoComplete>
        </div>

        <div className={css.navLinks}>
          <Menu
            mode='inline'
            selectedKeys={selectedKeys}
            className={menuClassName}
          >
            {renderMenuItems(selectedKeys[0], this.items, items)}
          </Menu>
        </div>
      </div>
    )
  }

  render () {
    const { affix } = this.props

    return (
      <div style={{ position: 'relative', height: '100%' }}>
        {(this.state.isMobile || (!this.state.isMobile && !affix)) && this.renderMenu()}
        {(!this.state.isMobile && affix) && (
          <Affix offsetTop={30}>
            {this.renderMenu()}
          </Affix>
        )}
      </div>
    )
  }
}

SideNav.propTypes = {
  getAthletesMeta: PropTypes.func.isRequired,
  selectedKeys: PropTypes.array,
  description: PropTypes.object,
  title: PropTypes.string,
  withCount: PropTypes.bool,
  affix: PropTypes.bool,
  location: PropTypes.object.isRequired,
}

SideNav.defaultProps = {
  description: null,
  title: '',
  withCount: true,
  selectedKeys: [],
  affix: false,
}

const mapStateToProps = state => ({
  session: sessionSelector(state),
})

const mapDispatchToProps = () => dispatch => ({
  getAthleteProfile: id => dispatch(getAthleteProfile(id)),
  searchOfAthlete: value => dispatch(searchOfAthlete(value)),
  searchOfWorkout: id => dispatch(searchOfWorkout(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SideNav))
