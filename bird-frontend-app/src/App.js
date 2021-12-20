import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import { isEmpty } from 'lodash'
import { authorized, unauthorized } from 'modules/router/routes'
import { connect } from 'react-redux'
import { sessionSelector } from 'modules/session/session-selectors'
import { logout } from 'modules/session/session-actions'
import { push } from 'modules/router'
import { isAdmin } from 'utils'

const { Content } = Layout

const RouteWithSubRoutes = route => (
  <Route path={route.path} render={props => <route.component {...props} routes={route.routes} />} />
)

const App = props => {
  const { session: { user }, location: { pathname }, history } = props

  const getRedirectTo = () => {
    if (user && !user?.isOnboardingCompleted && !isAdmin(user)) {
      return '/steps/1'
    } else if (user) {
      return '/plan_template/0/athletes'
    } else {
      return '/'
    }
  }

  useEffect(() => {
    if (
      pathname !== '/email-confirm' && pathname !== '/update-password' &&
      pathname !== '/invite' && pathname !== '/success' &&
      pathname !== 'unsucessful' && pathname !== '/error'
    ) {
      if (user && isAdmin(user)) {
        push('/users')
        return
      }
      if (user && !user?.isOnboardingCompleted && !pathname.includes('/steps/') && !isAdmin(user)) {
        if (pathname.includes('logout')) {
          props.onLogout()
        } else {
          push('/steps/1')
        }
      } else if (user && !user?.isOnboardingCompleted) {
        if (pathname.includes('logout')) {
          props.onLogout()
        } else {
          push('/steps/1')
        }
      } else if (user && pathname === '/logout') {
        props.onLogout()
      } else if (!user && pathname === '/logout') {
        push('/')
      }
    }
  }, [props?.session?.user])

  useEffect(() => {
    if (pathname === '/logout' && history?.action === 'POP') {
      props.onLogout()
    }
  }, [pathname])

  const redirectTo = getRedirectTo()

  const renderContent = routes => (
    <Content>
      <Switch>
        {routes.map(route => <RouteWithSubRoutes key={route.path} {...route} />)}
        {pathname !== '/logout' && <Route render={props => <Route component={() => <Redirect to={redirectTo} />} />} />}
      </Switch>
    </Content>
  )

  return isEmpty(user) ? renderContent(unauthorized) : renderContent(authorized)
}

App.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  session: sessionSelector(state),
})

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
