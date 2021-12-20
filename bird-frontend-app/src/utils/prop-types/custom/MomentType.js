import { isMoment } from 'moment'
import CustomType from 'utils/prop-types/CustomType'

const MomentType = CustomType((props, propName, componentName) => {
  const { [propName]: value } = props

  if (!isMoment(value)) {
    return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected a moment instance.`)
  }

  return null
})

export default MomentType
