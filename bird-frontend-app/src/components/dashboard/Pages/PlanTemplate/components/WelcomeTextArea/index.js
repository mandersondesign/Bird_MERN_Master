import React, { useRef } from 'react'
import { useWelcomeText } from './hooks/useWelcomeText'
import { WelcomeArea, WelcomeContainer, WelcomeTitle } from './styled'

const WelcomeTextArea = ({ planTemplate }) => {
  const {
    areaValue,
    updateAreaValue,
    setAreaValue,
    sendWelcomeText,
  } = useWelcomeText(planTemplate)
  const AreaRef = useRef(null)
  return (
    <WelcomeContainer>
      <WelcomeTitle>Welcome Text</WelcomeTitle>
      <WelcomeArea
        ref={AreaRef}
        value={areaValue}
        onChange={updateAreaValue}
        onKeyDown={async event => {
          if (event.keyCode === 13 && event.ctrlKey) {
            setAreaValue(prevValue => prevValue + '\n')
          }
          if (event.keyCode === 13) {
            event.preventDefault()
            sendWelcomeText()

            AreaRef.current.blur()
          }
        }}
        placeholder='Your message...'
      />
    </WelcomeContainer>
  )
}
export default WelcomeTextArea
