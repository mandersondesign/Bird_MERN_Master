import { connect } from 'react-redux'
import { Athletes } from 'components/dashboard/Pages'

import { getAthletes } from './athlets-actions'
import { athletsSelector } from './athlets-selectors'

const mapStateToProps = state => ({
  athlets: athletsSelector(state),
})

// const mapDispatchToProps = dispatch => ({
const mapDispatchToProps = dispatch => ({
  getAthletes: (page, sortField, sortDirection, query) => dispatch(getAthletes(page, sortField, sortDirection, query)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Athletes)
