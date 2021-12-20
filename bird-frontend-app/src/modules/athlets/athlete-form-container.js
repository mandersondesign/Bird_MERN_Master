import { connect } from 'react-redux'
import { Athlete } from 'components/dashboard/Pages'

import { getAthletes, getPlans, getAthleteProfile, resetPlanOfAthlete } from './athlets-actions'
import { athletsSelector } from './athlets-selectors'

const mapStateToProps = state => ({
  athlets: athletsSelector(state),
})

const mapDispatchToProps = dispatch => ({
  getAthletes: () => dispatch(getAthletes()),
  getPlans: () => dispatch(getPlans()),
  getAthleteProfile: id => dispatch(getAthleteProfile(id)),
  resetPlanOfAthlete: () => dispatch(resetPlanOfAthlete()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Athlete)
