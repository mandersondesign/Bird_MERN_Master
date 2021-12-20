import { connect } from 'react-redux'
import { EditUser } from 'components/dashboard'

import { getAthletes } from './athlets-actions'
import { athletsSelector } from './athlets-selectors'

const mapStateToProps = state => ({
  athlets: athletsSelector(state),
})

// const mapDispatchToProps = dispatch => ({
const mapDispatchToProps = dispatch => ({
  getAthletes: () => dispatch(getAthletes()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditUser)
