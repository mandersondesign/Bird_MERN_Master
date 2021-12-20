import styled from 'styled-components'
import ChatIcon from '@material-ui/icons/ChatBubbleOutline'
import ChatIconFilled from '@material-ui/icons/ChatBubble'
import CloseIcon from '@material-ui/icons/Close'
import { CircularProgress } from '@material-ui/core'
import { GREY_BUTTON } from '../../styles/variables'

export const IconChat = styled(ChatIcon).attrs(({ hover, isToday }) => ({
  style: {
    color: hover ? (isToday ? '#FFF' : '#000') : '#A0A0A0',
    width: 18,
    height: 18,
    transition: '1s ease',
  },
}))`
  &:hover {
    cursor: pointer;
  }
`
export const IconChatFilled = styled(ChatIconFilled).attrs(
  ({ hover, isToday }) => ({
    style: {
      color: hover ? (isToday ? '#FFF' : '#000') : '#A0A0A0',
      width: 18,
      height: 18,
      transition: '1s ease',
    },
  }),
)`
  &:hover {
    cursor: pointer;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`
export const Title = styled.span`
  font-family: Celias-Bold;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: -0.5px;
  color: #000000;
`
export const IconClose = styled(CloseIcon).attrs({
  style: {
    width: 20,
    height: 20,
    color: 'black',
  },
})`
  &:hover {
    cursor: pointer;
  }
`

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border-width: 0px;
  padding: 8px 16px;

  font-family: Celias-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  /* or 136% */

  color: #000000;
`

export const CustomButton = styled.button`
  height: 40px;
  width: 128px;
  padding: 0px 15px;
  align-self: flex-end;
  background-color: ${props => props.backgroundColor};
  border-width: 0px;
  border-radius: 8px;
  font-family: SFProText-Bold;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;

  color: #000000;
  margin-top: 30px;
  &:hover {
    cursor: pointer;
    background-color: ${GREY_BUTTON};
  }
`
export const ErrorMessage = styled.span`
  font-size: 12px;
  color: red;
  margin-top: 10px;
`
export const TextSent = styled.span`
  font-family: SFProText-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.2px;
  margin-top: 30px;
`

export const Loading = styled(CircularProgress)`
  color: #4d4d4d;
`
