import axios from 'axios'
import { isPlainObject } from 'lodash'
import config from 'config'
import { camelizeKeys, snakeizeKeys } from './transform'

export const createApi = (configProps = {}) => {
  const api = axios.create({
    headers: config.headers,
    responseType: 'json',
    transformRequest (data) {
      if (isPlainObject(data)) {
        return JSON.stringify(snakeizeKeys(data))
      }

      return data
    },
    transformResponse (data) {
      return camelizeKeys(data)
    },
    ...configProps,
  })

  api.interceptors.request.use(conf => {
    if (conf.params) {
      // eslint-disable-next-line no-param-reassign
      conf.params = snakeizeKeys(conf.params)
    }

    return conf
  })

  return api
}

export const api = createApi({ baseURL: config.url })
export const api2 = createApi({ baseURL: config.url2 })

api.interceptors.response.use(response => response, error => {
  if (error?.response?.data?.error === 'Wrong token') {
    window.location.pathname = '/'
  } else if (error) {
    throw error
  }
})
