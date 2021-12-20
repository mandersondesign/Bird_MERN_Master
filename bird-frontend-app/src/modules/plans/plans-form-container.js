import { connect } from 'react-redux'
import { ActivePlan } from 'components/dashboard/Pages'
import { sessionSelector } from 'modules/session/session-selectors'
import { plansSelector } from 'modules/plans/plans-selectors'
import { publishPlanAthlete, getMessagesAthlete, batchPublishPlanAthlete } from 'modules/athlets/athlets-actions'
import { getPlanAthletes } from './plans-actions'

const mapStateToProps = state => ({
  session: sessionSelector(state),
  plans: plansSelector(state),
})

const mapDispatchToProps = dispatch => ({
  getPlanAthletes: (id, page, sortField, sortDirection, query) => dispatch(getPlanAthletes(id, page, sortField, sortDirection, query)),
  publishPlanAthlete: id => dispatch(publishPlanAthlete(id)),
  batchPublishPlanAthlete: ids => dispatch(batchPublishPlanAthlete(ids)),
  getMessagesAthlete: id => dispatch(getMessagesAthlete(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ActivePlan)
