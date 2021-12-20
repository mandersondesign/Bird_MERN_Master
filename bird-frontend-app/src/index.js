import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import { StylesProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { ConfigProvider } from 'components'
import { history } from 'modules/router'
import { createStore } from 'modules/store'
import { api } from 'api/axios'
import App from './App'
import AppFeet from './AppFeet'
import AppMarketing from './AppMarketing'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import config from 'config'
import { SocketProvider } from './providers/SocketProvider'
import { PullingAthletes } from './providers/PullingAthletes'

import(/* webpackPreload: true */ './styles/index.less')

const { store, persistor } = createStore()

api.interceptors.request.use(config => {
  const state = store.getState()

  const filedName = process.env.NAME === 'main' ? 'session' : process.env.NAME
  const token = state[filedName]?.token

  return token ? { ...config, headers: { ...config.headers, token } } : config
})

const rootElement = document.getElementById('root')

const endpoints = {
  main: App,
  feet: AppFeet,
  marketing: AppMarketing,
}

const Root = () => {
  return (
    <Switch>
      <Route path='/' component={endpoints[process.env.NAME]} />
    </Switch>
  )
}

const stripePromise = loadStripe(config.stripeKey)

const render = Component => {
  ReactDOM.render(
    <StylesProvider>
      <Elements stripe={stripePromise}>
        <CookiesProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <ConfigProvider>
                <SocketProvider>
                  <PullingAthletes>
                    <Router history={history}>
                      <Component />
                    </Router>
                  </PullingAthletes>
                </SocketProvider>
              </ConfigProvider>
            </PersistGate>
          </Provider>
        </CookiesProvider>
      </Elements>
    </StylesProvider>,
    rootElement,
  )
}

render(process.env.NODE_ENV === 'development' ? hot(module)(Root) : Root)
