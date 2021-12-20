import { connect } from 'react-redux'
import { EditUser } from 'components/dashboard'

import { plansSelector } from './plans-selectors'

const mapStateToProps = state => ({
  athlets: plansSelector(state),
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditUser)
