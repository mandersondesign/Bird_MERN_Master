import { connect } from 'react-redux'
import { Workouts } from 'components/dashboard/Pages'

import { workoutsSelector } from './workouts-selectors'

const mapStateToProps = state => ({
  workouts: workoutsSelector(state),
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Workouts)
