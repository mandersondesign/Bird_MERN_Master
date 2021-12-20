import { connect } from 'react-redux'
import { ResetPasswordRequest } from 'components/auth'

// import {resetPasswordSubmitAction, resetPasswordUpdateAction} from './reset-password-actions';
import { resetPasswordSelector } from './reset-password-selectors'

const mapStateToProps = state => ({
  value: resetPasswordSelector(state),
})

const mapDispatchToProps = () => ({
  // onChange: value => dispatch(loginUpdateAction(value)),
  // onSubmit: value => auth.login(value)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPasswordRequest)
