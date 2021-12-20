import { connect } from 'react-redux'
import { Onboarding } from 'components/dashboard/Pages'

import { onboardingSelector } from './onboarding-selectors'

const mapStateToProps = state => ({
  onboarding: onboardingSelector(state),
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding)
