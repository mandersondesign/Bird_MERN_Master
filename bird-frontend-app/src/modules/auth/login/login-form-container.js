import { connect } from 'react-redux'
import { Login } from 'components/auth'

import { loginUpdateAction } from './login-actions'
import { loginSelector } from './login-selectors'

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
)(Login)
