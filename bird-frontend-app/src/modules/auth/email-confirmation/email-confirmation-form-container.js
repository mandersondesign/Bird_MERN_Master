import { connect } from 'react-redux'
import { EmailConfirmation } from 'components/auth'

// import {resetPasswordSubmitAction, resetPasswordUpdateAction} from './reset-password-actions';

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({
  // onChange: value => dispatch(loginUpdateAction(value)),
  // onSubmit: value => auth.login(value)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailConfirmation)
