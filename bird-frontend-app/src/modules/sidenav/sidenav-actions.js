import { coaches, search } from 'api'
import { SIDENAV_SET, SIDENAV_SEARCH, SIDENAV_WORKOUTS_SEARCH, SIDENAV_IS_MOBILE, SIDENAV_IS_MENU } from './sidenav-constants'
import { showError } from 'utils'

export const sideNavSetAction = payload => ({ type: SIDENAV_SET, payload })

export const searchAthlete = payload => ({ type: SIDENAV_SEARCH, payload })

export const searchWorkout = payload => ({ type: SIDENAV_WORKOUTS_SEARCH, payload })

export const isMobileAction = payload => ({ type: SIDENAV_IS_MOBILE, payload })

export const isMenuAction = payload => ({ type: SIDENAV_IS_MENU, payload })

/* --------------------------------------------------------------------- */

export const getAthletesMeta = () => dispatch => coaches.getAthleteMetaInfo()
  .then(({ data }) => dispatch(sideNavSetAction(data.meta)))
  .catch(err => showError(`Error loading athletes meta info: ${err}`))

export const searchOfAthlete = value => dispatch => {
  dispatch(searchAthlete(value))
}

export const isMobile = value => dispatch => dispatch(isMobileAction(value))

export const isMenu = value => dispatch => dispatch(isMenuAction(value))

export const searchAll = (value, dataSource) => dispatch => search.getSearch(value)
  .then(r => {
    const newDataSource = {
      ...dataSource,
      athletes: {
        ...dataSource.athletes,
        children: [
          {
            id: 'u-0',
            title: 'No athletes found',
          },
        ],
      },
      planTemplates: {
        ...dataSource.planTemplates,
        children: [
          {
            id: 'p-0',
            title: 'No plan templates found',
          },
        ],
      },
      workouts: {
        ...dataSource.workouts,
        children: [
          {
            id: 'w-0',
            title: 'No workouts found',
          },
        ],
      },
    }

    if (r.data.athletes.length) {
      newDataSource.athletes.children = r.data.athletes.map(o => ({ ...o, id: `u-${o.userId}`, title: o.name }))
    }

    if (r.data.planTemplates.length) {
      newDataSource.planTemplates.children = r.data.planTemplates.map(o => ({
        ...o, id: `p-${o.planTemplateId}`, title: o.name,
      }))
    }

    if (r.data.workouts.length) {
      newDataSource.workouts.children = r.data.workouts.map(o => ({
        ...o, id: `w-${o.workoutLibraryId}`, title: o?.name,
      }))
    }

    return newDataSource
  })
  .catch(() => false)

export const searchOfWorkout = id => dispatch => {
  dispatch(searchWorkout(id))
}
