import { connect } from 'react-redux'
import { Login } from 'components/auth'

import { login } from './session-actions'
import { sessionSelector } from './session-selectors'

const mapStateToProps = state => ({
  value: sessionSelector(state),
})

const mapDispatchToProps = dispatch => ({
  login: value => dispatch(login(value)),
  // userLogout: dispatch(logout()),
  // onSubmit: value => auth.login(value)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
