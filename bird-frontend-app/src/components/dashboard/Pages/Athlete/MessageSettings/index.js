import React from 'react'
import { Switch } from 'antd'
import {
  SettingsCard,
  SubTitle,
  Title,
  Body,
  ColumnRight,
  ColumnLeft,
  CheckedText,
} from './styled'
import { YELLOW } from '../../../../../styles/variables'
import { useSwitch } from './hooks'

export const MessageSettings = ({ athlete }) => {
  const { loading, checked, toggleSwitch } = useSwitch(athlete)

  return (
    <SettingsCard xs={12} sm={12} md={6} lg={6}>
      <ColumnLeft>
        <Title>Message Settings</Title>
        <SubTitle>Include athlete in group texts</SubTitle>
        <Body>
          Sends athlete scheduled texts in template and includes them in new
          group texts.
        </Body>
      </ColumnLeft>
      <ColumnRight>
        <Switch
          style={{ backgroundColor: checked ? YELLOW : null }}
          checkedChildren={<CheckedText>on</CheckedText>}
          unCheckedChildren={<CheckedText>off</CheckedText>}
          loading={loading}
          checked={checked}
          onChange={toggleSwitch}
        />
      </ColumnRight>
    </SettingsCard>
  )
}
