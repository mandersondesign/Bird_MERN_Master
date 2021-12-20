import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import persistStore from './persist-store'
import persistReducer from './persist-reducer'

function devTools () {
  // noinspection JSUnresolvedVariable
  return window?.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line no-underscore-dangle
    : f => f
}

export default (initialState = {}) => {
  const middlewares = [thunk]
  const enhancers = []

  if (process.env.NODE_ENV === 'development') {
    enhancers.push(devTools())
  }

  const store = createStore(
    persistReducer(),
    initialState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers,
    ),
  )

  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./create-reducer', () =>
      store.replaceReducer(persistReducer()),
    )
  }

  const persistor = persistStore(store)

  return { store, persistor }
}
