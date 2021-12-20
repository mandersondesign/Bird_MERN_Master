import { has } from 'lodash'
import sprites from 'sprites'
import CustomType from 'utils/prop-types/CustomType'

function isSprite (value) {
  return has(sprites, value)
}

const SpriteType = CustomType((props, propName, componentName) => {
  const { [propName]: value } = props

  if (value && !isSprite(value)) {
    return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected a valid sprite.`)
  }

  return null
})

export default SpriteType
