import { searchOfAthlete } from 'modules/sidenav/sidenav-actions'
import { pageSelector } from 'modules/page/page-selectors'
import { setPageAthletes, sortAthletes } from 'modules/page/page-actions'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { isEmptyObject } from '../../../utils/basic'

export const useSearchAthletes = () => {
  const { pageAthletes, allAthletes, currentSortType } = useSelector(
    pageSelector,
  )
  const params = useParams()
  const dispatch = useDispatch()

  const filterListAthletes = id => {
    const searchedUser =
      pageAthletes.find(athlete => athlete.userId === +id) || []
    dispatch(setPageAthletes([searchedUser]))
    dispatch(searchOfAthlete(searchedUser.name))
  }

  const resetPageAthletes = () => {
    const isEmpty = isEmptyObject(params)
    const planTemplateId = parseInt(params?.planTemplateId)

    if (isEmpty && window.location.pathname === '/athletes') {
      dispatch(setPageAthletes(allAthletes))
      dispatch(sortAthletes(currentSortType))
    }
    if (isEmpty && window.location.pathname === '/athletes/unassigned') {
      const unassignedAthletes = getUnassignedathletes()
      dispatch(setPageAthletes(unassignedAthletes))
      dispatch(sortAthletes(currentSortType))
    }

    if (planTemplateId > 0) {
      const planAthletes = getFromPlanTemplate(planTemplateId)
      dispatch(setPageAthletes(planAthletes))
      dispatch(sortAthletes(currentSortType))
    }
    if (planTemplateId === 0) {
      const activeAthletes = getActiveAthletes()
      dispatch(setPageAthletes(activeAthletes))
      dispatch(sortAthletes(currentSortType))
    }
  }

  const getUnassignedathletes = () =>
    [...allAthletes].filter(athlete => !athlete?.plan || !athlete.plan.isActive)

  const getFromPlanTemplate = planTemplateId => {
    const planAthletes = [...allAthletes].filter(
      athlete =>
        athlete?.plan &&
        athlete.plan.isActive &&
        athlete?.plan?.planTemplateId === planTemplateId,
    )
    return planAthletes
  }

  const getActiveAthletes = () => {
    const activeAthletes = [...allAthletes].filter(
      athlete => athlete?.plan && athlete.plan.isActive,
    )
    return activeAthletes
  }
  return {
    filterListAthletes,
    resetPageAthletes,
  }
}
