import { connect } from 'react-redux'
import { SideNav } from 'components'

import { getAthletesMeta } from './sidenav-actions'
import { sideNavSelector } from './sidenav-selectors'

const mapStateToProps = state => ({
  meta: sideNavSelector(state),
})

const mapDispatchToProps = dispatch => ({
  getAthletesMeta: () => dispatch(getAthletesMeta()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideNav)
