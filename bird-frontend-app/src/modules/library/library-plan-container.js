import { connect } from 'react-redux'
import { PlanTemplate } from 'components/dashboard/Pages'

import { getTypesWorkout, getPaces } from '../athlets/athlets-actions'
import { getPlansTemplates, getPlanTemplate, addNewPhases, updatePhase, resetPlanTemplate, setNewPhase, sortPlan, sortPhasesPlan } from './library-actions'
import { librarySelector } from './library-selectors'

const mapStateToProps = state => ({
  library: librarySelector(state),
})

const mapDispatchToProps = dispatch => ({
  getPlansTemplates: () => dispatch(getPlansTemplates()),
  getPlanTemplate: id => dispatch(getPlanTemplate(id)),
  addNewPhases: (namesOfPhases, id, data) => dispatch(addNewPhases(namesOfPhases, id, data)),
  updatePhase: (planId, phaseId, data) => dispatch(updatePhase(planId, phaseId, data)),
  getTypesWorkout: () => dispatch(getTypesWorkout()),
  getPaces: () => dispatch(getPaces()),
  resetPlanTemplate: () => dispatch(resetPlanTemplate()),
  setNewPhase: bool => dispatch(setNewPhase(bool)),
  sortPlan: (planId, data) => dispatch(sortPlan(planId, data)),
  sortPhasesPlan: phases => dispatch(sortPhasesPlan(phases)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlanTemplate)
