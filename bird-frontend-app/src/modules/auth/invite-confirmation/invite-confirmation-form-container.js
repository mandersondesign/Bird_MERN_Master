import { connect } from 'react-redux'
import { InviteConfirmation } from 'components/auth'

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({
  // onChange: value => dispatch(loginUpdateAction(value)),
  // onSubmit: value => auth.login(value)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InviteConfirmation)
