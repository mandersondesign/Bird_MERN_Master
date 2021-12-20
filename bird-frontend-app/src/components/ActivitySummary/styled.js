import styled from 'styled-components'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import CancelIcon from '@material-ui/icons/Cancel'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import DoneIcon from '@material-ui/icons/Done'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import { GREEN_CHECK, RED_DARK, YELLOW } from '../../styles/variables'

export const ActivityContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  width: 70%;
`

export const ActivityColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: ${props => props.marginRight};
  justify-content: ${props => props.justifyContent};
  &:hover {
    cursor: pointer;
  }
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
export const WorkoutName = styled.span`
  font-family: SFProDisplay-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.2px;
  margin-left: 10px;
  color: #333333;
`
export const WorkoutStatus = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 6px;
  align-items: center;
`

export const Completed = styled(CheckCircleIcon).attrs({
  style: {
    height: 16,
    width: 16,
    marginRight: 4,
    color: GREEN_CHECK,
  },
})``

export const PartiallyCompleted = styled(CheckCircleOutlineIcon).attrs({
  style: {
    height: 16,
    width: 16,
    marginRight: 4,
    color: GREEN_CHECK,
  },
})``

export const NotCompleted = styled(CancelIcon).attrs({
  style: {
    height: 16,
    width: 16,
    marginRight: 4,
    color: RED_DARK,
  },
})``

export const NoResults = styled.div`
  height: 16px;
  width: 16px;
  border-radius: 9px;
  margin-right: 4px;
  background-color: #ececec;
`

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
  justify-content: flex-end;
  align-items: ${props => props.alignitems};
`
export const LoveIcon = styled(FavoriteBorderIcon).attrs({
  style: {
    width: 18,
    height: 18,
    marginRight: 4,
  },
})`
  &:hover {
    cursor: pointer;
  }
`

export const FilledLoveIcon = styled(FavoriteIcon).attrs({
  style: {
    width: 18,
    height: 18,
    marginRight: 4,
    color: YELLOW,
  },
})`
  &:hover {
    cursor: pointer;
  }
`

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
