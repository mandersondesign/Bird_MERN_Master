import React, { useEffect } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Layout } from 'antd'
import { marketing, marketingAuthorized } from 'modules/router/routes'

const { Content } = Layout

const RouteWithSubRoutes = route => (
  <Route path={route.path} render={props => <route.component {...props} routes={route.routes} />} />
)

const AppMarketing = () => {
  const { token } = useSelector(({ marketing }) => marketing)
  const { pathname } = useLocation()
  const history = useHistory()

  const routes = token ? marketingAuthorized : marketing

  useEffect(() => {
    if (token) {
      const programName = window.location.pathname.split('/')[2]
      if (pathname === `/sign-up/${programName}` || pathname === `/sign-in/${programName}`) {
        history.push(`/${programName}`)
      }
    }
  }, [])

  return (
    <Content>
      <Switch>
        {routes.map(route => <RouteWithSubRoutes key={route.path} {...route} />)}
        <Route component={() => <div>404</div>} />
      </Switch>
    </Content>
  )
}

export default AppMarketing
