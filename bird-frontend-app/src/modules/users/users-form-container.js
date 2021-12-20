import { connect } from 'react-redux'
import { Users } from 'components/dashboard/Pages'

import { logAsCoach } from 'modules/session/session-actions'
import { sessionSelector } from 'modules/session/session-selectors'
import { getUsers } from './users-actions'
import usersSelector from './users-selectors'

const mapStateToProps = state => ({
  users: usersSelector(state),
  session: sessionSelector(state),
})

const mapDispatchToProps = dispatch => ({
  getUsers: (page, query) => dispatch(getUsers(page, query)),
  logAsCoach: id => dispatch(logAsCoach(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
