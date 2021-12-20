import { connect } from 'react-redux'
import { PlanTemplates } from 'components/dashboard/Pages'

import { getAthletesMeta } from 'modules/sidenav/sidenav-actions'
import { getPlansTemplates, createPlan, deletePlan } from './library-actions'
import { librarySelector } from './library-selectors'

const mapStateToProps = state => ({
  library: librarySelector(state),
})

const mapDispatchToProps = dispatch => ({
  getPlansTemplates: (sortField, sortDirection) => dispatch(getPlansTemplates(sortField, sortDirection)),
  createPlan: data => dispatch(createPlan(data)),
  deletePlan: id => dispatch(deletePlan(id)),
  getAthletesMeta: () => dispatch(getAthletesMeta()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlanTemplates)
