import styled from 'styled-components'
import { YELLOW } from '../../styles/variables'

export const SortingButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #333333;
  &:hover {
    cursor: pointer;
    background: #333333;
    color: white;
  }
`

export const Divider = styled.div`
  height: 1px;
  background-color: #c4c4c4;
`
export const Menu = styled.div`
  background: #ffffff;
  border: 1px solid #828282;
  box-sizing: border-box;
  border-radius: 6px;
  overflow: hidden;
`

export const MenuItem = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  &:hover {
    cursor: pointer;
    background-color: ${YELLOW};
  }
`

export const MenuTitle = styled.span`
  font-family: SFProDisplay-Regular;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 42px;
  letter-spacing: -0.015em;
  color: #333333;
`
