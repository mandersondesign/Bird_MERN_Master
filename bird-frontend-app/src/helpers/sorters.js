import _ from 'lodash'

const sorters = {
  // https://stackoverflow.com/a/6712080
  // ...
  // sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'contentType.name'),
  // ...
  sortCollectionByPath (a = {}, b = {}, path = '') {
    if (_.get(a, path) < _.get(b, path)) return -1
    if (_.get(a, path) > _.get(b, path)) return 1
    return 0
  },

  sortCollectionByInt (a = {}, b = {}, path = '') {
    if (parseInt(_.get(a, path), 10) < parseInt(_.get(b, path), 10)) return -1
    if (parseInt(_.get(a, path), 10) > parseInt(_.get(b, path), 10)) return 1
    return 0
  },
}

export default sorters
