import styled from 'styled-components'
import { LinearProgress } from '@material-ui/core'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { YELLOW } from '../../../../../styles/variables'

export const Container = styled.div`
  flex: 1;
  background: #ffffff;
  border: 1px solid #828282;
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 8px;
  padding: 16px;
  display: flex;
  flex-direction: ${({ isLoadingMessages }) =>
    isLoadingMessages ? 'column' : 'column-reverse'};
  align-items: flex-start;
  overflow: auto;
`

export const Loading = styled(LinearProgress).attrs({
  style: { width: '100%' },
})``

export const ActivityContainer = styled.div`
  width: 85%;
  margin-bottom: 16px;
  min-height: min-content;
  display: flex;
  flex-direction: row;
  border: 1px solid #219653;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 16px;
  background-color: #f4faf5;
`
export const DateColumn = styled.div`
  flex: 1;
  margin-right: 8px;
  display: flex;
  flex-direction: column;
`
export const DateLabel = styled.span`
  font-family: SFProDisplay-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 10px;
  text-align: center;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  margin-bottom: 4px;
`

export const DateNumber = styled.span`
  font-family: SFProDisplay-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 24px;

  text-align: center;
  letter-spacing: -0.4px;
  color: #333333;
`

export const WorkoutTypeColumn = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
`
export const TypeName = styled.span`
  font-family: SFProDisplay-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 10px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  margin-bottom: 6px;
`
export const StatusRow = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 2px;
  justify-content: space-between;
`

export const StatusName = styled.span`
  font-family: SFProDisplay-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.2px;
  color: #333333;
  margin-left: 4px;
  margin-right: 8px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`

export const LikeColumn = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
`
export const LoveIcon = styled(FavoriteBorderIcon).attrs({
  style: {
    width: 18,
    height: 18,
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
    color: YELLOW,
  },
})`
  &:hover {
    cursor: pointer;
  }
`
