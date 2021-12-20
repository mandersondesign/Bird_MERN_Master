import styled from 'styled-components'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import DoneIcon from '@material-ui/icons/Done'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import { GREEN_CHECK, YELLOW } from '../../../../../styles/variables'

export const MessageContainer = styled.div`
  align-self: ${props => (props.isFromAthlete ? 'flex-start' : 'flex-end')};
  width: 85%;
  margin-bottom: 16px;
  min-height: min-content;
  display: flex;
  flex-direction: column;
`

export const Sender = styled.span`
  font-family: SFProDisplay-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.2px;
  color: #333333;
  margin-bottom: 10px;
`

export const MessageBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid ${props => (props.isPlanMessage ? GREEN_CHECK : '#e0e0e0')};
  background: ${props =>
    props.isPlanMessage ? 'rgba(33, 150, 83, 0.05) ' : 'white'};
  box-sizing: border-box;
  border-radius: 6px;
  margin-bottom: 10px;
`

export const Message = styled.div`
  display: block;
  font-family: SFProText-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.2px;
  color: #333333;
  white-space: pre-wrap;
  word-wrap: break-word;
`
export const ActivityContainer = styled.div`
  display: flex;
  height: 55px;
  margin-bottom: 24px;
`

export const ActivityColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: ${props => props.marginRight};
  justify-content: ${props => props.justifyContent};
`

export const ActivityDay = styled.span`
  font-family: SFProDisplay-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 10px;
  text-align: center;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #333333;
`
export const ActivityNumber = styled.span`
  display: flex;
  align-self: center;
  font-family: SFProDisplay-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.4px;
  color: #333333;
`
export const Benchmark = styled.span`
  font-family: SFProDisplay-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.2px;

  color: #333333;
`
export const BenchmarkRow = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 6px;
  align-items: center;
`

export const CircleCheck = styled(CheckCircleIcon).attrs({
  style: {
    height: 14,
    width: 14,
    marginRight: 4,
    color: GREEN_CHECK,
  },
})``

export const DateContainer = styled.div`
  align-self: center;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Date = styled.span`
  font-family: SFProText-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  text-align: right;
  letter-spacing: -0.17px;
  color: #4f4f4f;
`
export const SentIcon = styled(DoneIcon).attrs({
  style: {
    height: 16,
    width: 16,
    marginLeft: 4,
    color: '#4f4f4f',
  },
})``

export const ReceivedIcon = styled(DoneAllIcon).attrs({
  style: {
    height: 16,
    width: 16,
    marginLeft: 4,
    color: '#4f4f4f',
  },
})``

export const ReActionRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  alignitems: center;
  justify-content: flex-end;
`
export const LoveIcon = styled(FavoriteBorderIcon).attrs({
  style: {
    width: 16,
    height: 18,
    marginRight: 4,
  },
})``

export const FilledLoveIcon = styled(FavoriteIcon).attrs({
  style: {
    width: 16,
    height: 18,
    marginRight: 4,
    color: YELLOW,
  },
})``

export const LoveLabel = styled.span`
  font-family: SFProDisplay-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  letter-spacing: -0.2px;
  text-decoration-line: underline;
  color: #333333;
  mix-blend-mode: normal;
`
