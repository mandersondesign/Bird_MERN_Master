import styled from 'styled-components'
import { GREY_BUTTON, YELLOW } from '../../../../styles/variables'

export const ModalButton = styled.button`
  background: ${({ inviteAthlete }) => (inviteAthlete ? 'white' : YELLOW)};
  border: 1px solid
    ${({ inviteAthlete }) => (inviteAthlete ? '#4d4d4d' : YELLOW)};
  box-sizing: border-box;
  border-radius: 6px;
  padding: 12px;
  margin-right: 8px;
  font-family: SFProDisplay-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #4d4d4d;

  &:hover {
    cursor: pointer;
    background-color: ${({ inviteAthlete }) =>
    inviteAthlete ? '#4f4f4f' : GREY_BUTTON};
    border: 1px solid
      ${({ inviteAthlete }) => (inviteAthlete ? '#4f4f4f' : GREY_BUTTON)};
    color: ${({ inviteAthlete }) => (inviteAthlete ? 'white' : '#4d4d4d')};
  }
`
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: centerr;
`
