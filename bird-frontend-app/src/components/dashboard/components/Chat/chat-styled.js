import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close'
import TelegramIcon from '@material-ui/icons/Telegram'
import { GREY_BUTTON, LINK_BLUE } from '../../../../styles/variables'

export const ChatContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 375px;
  padding: 32px 16px 16px 16px;
`
export const ChatHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`
export const Title = styled.span`
  font-family: SFProDisplay-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: -0.4px;
  text-decoration-line: underline;
  color: #333333;
`
export const CloseButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 0px;
  background-color: white;
  &:hover {
    cursor: pointer;

    border-bottom: 1px solid ${LINK_BLUE};
  }
`
export const CloseTitle = styled.span`
  font-family: SFProText-Bold;
  height: 20px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.2px;
  color: ${LINK_BLUE};
`
export const IconClose = styled(CloseIcon).attrs({
  style: {
    width: 16,
    height: 16,
    marginRight: 4,
    color: LINK_BLUE,
  },
})``

export const ChatBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`
export const SubTitle = styled.span`
  font-family: SFProText-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.2px;
  color: #333333;
  margin-bottom: 16px;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`
export const Input = styled.textarea`
  flex: 1;
  background: #ffffff;
  border: 1px solid #828282;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 16px 16px 16px 16px;
  margin-right: 8px;
  font-family: SFProDisplay-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.2px;
  color: #4f4f4f;
  mix-blend-mode: normal;
  max-height: 58px;
  white-space: pre-wrap;
  resize: none;
`
export const SendButton = styled.button`
  display: flex;

  flex-direction: row;
  align-items: center;
  background: #333333;
  border: 1px solid #333333;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 16px 12px 16px 12px;
  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: ${GREY_BUTTON};
  }
  &:disabled {
    opacity: 0.2;
  }
`
export const SendTitle = styled.span`
  font-family: SFProDisplay-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #ffffff;
`
export const IconSend = styled(TelegramIcon).attrs({
  style: {
    color: 'white',
    marginRight: 10,
  },
})``
