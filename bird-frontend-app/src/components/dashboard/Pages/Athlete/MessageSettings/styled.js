import styled from 'styled-components'

export const SettingsCard = styled.div`
  display: flex;
  width: 49%;
  flex-direction: row;
  padding: 16px;
  background: #ffffff;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  border-radius: 6px;
  margin-bottom: 30px;
  @media screen and (max-width: 1250px) {
    width: 100%;
  }
`
export const Title = styled.span`
  font-family: SFProText-Bold;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: -0.5px;
  color: #000000;
  margin-bottom: 16px;
`
export const SubTitle = styled.span`
  font-family: SFProText-Bold;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.3px;
  color: #000000;
  margin-bottom: 12px;
`
export const Body = styled.span`
  font-family: SFProText-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.2px;
  color: #a0a0a0;
`
export const ColumnLeft = styled.span`
  flex-direction: column;
  display: flex;
  flex: 4;
`

export const ColumnRight = styled.span`
  flex: 1;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`
export const CheckedText = styled.span`
  font-family: SFProText-Regular;
  font-size: 10px;
  line-height: 19px;

  letter-spacing: -0.142857px;
  text-transform: uppercase;
  margin: 30px 6px;
  color: #000000;
`
