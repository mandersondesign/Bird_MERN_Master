import { connect } from 'react-redux'
import { Payment } from 'components/dashboard/Pages'

import { paymentSelector } from './payment-selectors'

const mapStateToProps = state => ({
  payment: paymentSelector(state),
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Payment)
