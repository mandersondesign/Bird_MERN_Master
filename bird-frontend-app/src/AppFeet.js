import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Layout } from 'antd'
import { fleetFeet } from 'modules/router/routes'

const { Content } = Layout

const RouteWithSubRoutes = route => (
  <Route path={route.path} render={props => <route.component {...props} routes={route.routes} />} />
)

class AppFeet extends Component {
  renderContent = routes => (
    <Content>
      <Switch>
        {routes.map(route => <RouteWithSubRoutes key={route.path} {...route} />)}
        <Route component={() => <div>404</div>} />
      </Switch>
    </Content>
  )

  render () {
    return this.renderContent(fleetFeet)
  }
}

export default withRouter(AppFeet)
