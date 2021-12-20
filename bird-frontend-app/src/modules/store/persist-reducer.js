import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createReducer from './create-reducer'

const whitelist = {
  feet: 'feet',
  main: 'session',
  marketing: '',
}

const projectName = process.env.NAME
const prefix = projectName === 'main' ? '' : projectName

const persistConfig = {
  key: `bird-frontend-app${prefix}`,
  storage,
  whitelist: [whitelist[projectName], 'page'],
}

export default asyncReducers =>
  persistReducer(persistConfig, createReducer(asyncReducers))
