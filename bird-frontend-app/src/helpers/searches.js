import _ from 'lodash'

const searches = {
  formSearch (searchString = '', data = []) {
    // Можно заоптимайзить, т.к. каждый раз ищу в первоначальном массиве.
    // А если искать в отфильтрованном, то как отловить момент, когда нужно искать по первоначальному
    // (например, удалил символ)
    const valueSearch = searchString.toLowerCase()

    let isSearch = false
    const filterSpeakers = _.filter(data, item => {
      // Проверка на вхождение вводимого значания в любое свойство объекта
      _.forOwn(item, value => {
        if (value && value.toString().toLowerCase().indexOf(valueSearch) + 1) {
          isSearch = true
        } else {
          isSearch = false
        }
        return !isSearch
      })
      if (isSearch) {
        return true
      }
      return false
    })

    if (filterSpeakers.length) return filterSpeakers

    return []
  },
}

export default searches
