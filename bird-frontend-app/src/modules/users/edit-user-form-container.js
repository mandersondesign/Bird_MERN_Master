import { connect } from 'react-redux'
import { EditUser } from 'components/dashboard/Pages'

import { getUser } from './users-actions'
import usersSelector from './users-selectors'

const mapStateToProps = state => ({
  users: usersSelector(state),
})

const mapDispatchToProps = dispatch => ({
  getUser: id => dispatch(getUser(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)
