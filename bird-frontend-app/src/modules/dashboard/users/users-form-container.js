import { connect } from 'react-redux'
import { Users } from 'components/dashboard'

import { loginUpdateAction } from './users-actions'
import { loginSelector } from './users-selectors'

const mapStateToProps = state => ({
  value: loginSelector(state),
})

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(loginUpdateAction(value)),
  // onSubmit: value => auth.login(value)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users)
