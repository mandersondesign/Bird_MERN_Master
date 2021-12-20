import styled from 'styled-components'
import { Grid } from '@material-ui/core'

export const CardContainer = styled(Grid)`
  background: white;

  border: 1px solid #828282;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 16px 0px 16px 0px;
  margin-bottom: 8px;
  &:hover {
    background: #f2f2f2;
  }
`
export const CardSection = styled(Grid)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-left: ${({ paddingleft }) => paddingleft};
`

export const Circle = styled.div`
  background: #2f80ed;
  width: 14px;
  height: 14px;
  border-radius: 8px;
  margin-right: 16px;
  align-self: center;
  opacity: ${props => (props.hasnewmessage ? 1 : 0)};
`

export const Image = styled.img`
  border-radius: 6px;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  &:hover {
    cursor: pointer;
  }
`

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`

export const FullName = styled.span`
  font-family: SFProDisplay-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: -0.4px;
  color: #333333;
  margin-bottom: 8px;
  &:hover {
    cursor: pointer;
  }
`

export const PlanName = styled.span`
  font-family: SFProDisplay-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.2px;
  color: #333333;
  &:hover {
    cursor: pointer;
  }
`

export const LastMessage = styled.span`
  font-family: SFProText-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.2px;
  color: #333333;
  display: inline-block;
  width: 130ch;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:hover {
    cursor: pointer;
  }
`
