import get from 'lodash/get'

const sortCollectionByInt = (a = {}, b = {}, path = '') => parseInt(get(a, path), 10) - parseInt(get(b, path), 10)

const sortCollectionByPath = (a = {}, b = {}, path) => String(get(a, path) || '').localeCompare(get(b, path) || '')

export default {
  sortCollectionByInt,
  sortCollectionByPath,
}
