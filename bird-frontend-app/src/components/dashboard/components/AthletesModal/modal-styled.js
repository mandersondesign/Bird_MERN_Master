import styled from 'styled-components'
import { Dialog, CircularProgress } from '@material-ui/core'
import { GREY_BUTTON } from '../../../../styles/variables'

export const CustomButton = styled.button`
  width: 140px;
  height: 40px;

  color: #333333;
  background-color: ${props => props.backgroundColor};

  border-width: 0px;
  border-radius: 8px;

  font-family: SFProDisplay-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;

  margin-right: 16px;

  &:hover {
    cursor: pointer;
    background-color: ${GREY_BUTTON};
  }
`

export const CenteredDialog = styled(Dialog)`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ContentDialog = styled.div`
  display: flex;
  flex-direction: column;
  width: 910px;
  min-height: 569px;
  background: #ffffff;
  border: 1px solid #828282;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`

export const HeaderDialog = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #4d4d4d;
  padding: 10px 15px 10px 15px;
`
export const HeaderTitle = styled.span`
  font-family: SFProDisplay-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.2px;
  color: #ffffff;
`

export const BodyDialog = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  padding: 30px 32px 24px 32px;
  border: 1px solid #828282;
`

export const TextBox = styled.textarea`
  resize: none;
  height: 406px;
  border: ${({ error }) => (error ? '2px solid red' : '1px solid #828282')};
  box-sizing: border-box;
  border-radius: 6px;
  padding: 20px 16px 20px 16px;
  margin-bottom: 13px;
  font-family: SFProDisplay-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.17px;
  color: #222222;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const StartAdornment = styled.span`
  font-family: SFProDisplay-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.2px;
  color: #333333;
  margin-right: 16px;
`

export const PopperContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const PopperGroup = styled.span`
  font-family: SFProDisplay-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #333333;
  margin: 8px 0px 16px 16px;
`
export const PopperItem = styled.li`
  padding-left: 16px;
  margin-bottom: 8px;
`
export const PopperItemName = styled.span`
  font-family: SFProDisplay-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.2px;
  color: #000000;
  margin-right: 13px;
`
export const PopperItemPlan = styled.span`
  font-family: SFProDisplay-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 19px;
  letter-spacing: -0.17px;
  color: #4f4f4f;
`
export const Loading = styled(CircularProgress)`
  color: #4d4d4d;
`
export const ErrorMessage = styled.span`
  margin-bottom ${({ isBox }) => (isBox ? '13px' : '8px')};
  color: red;
  font-size: 12px;
`
