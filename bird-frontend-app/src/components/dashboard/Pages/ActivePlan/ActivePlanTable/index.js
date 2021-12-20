import React from 'react'
import Table from 'components/Table'
import { columns } from '../../../../Test/data'
import { UserInfo } from 'components/User'
import IconAntd from 'antd/lib/icon'
import { Tooltip } from 'components'
import { Link } from 'components/Link'
import { Icon } from 'components/CustomIcon'
import { Popover, Empty } from 'antd'
import moment from 'moment'
import css from './index.less'
import { getTypeIcon } from '../../../utils'

const Messages = ({ messages }) => {
  if (!messages.length) {
    return (
      <div className={css.wrapperSpinMessages}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    )
  }

  return (
    <div className={css.wrapperMessages}>
      {messages.map(i =>
        i.text.length ? (
          <div
            key={i.messageId}
            className={i.isFromAthlete ? css.message : css.messageRight}
          >
            <span className={css.date}>
              {moment(i.date).format('MM/DD/YYYY, HH:mm A')}
            </span>
            <span className={css.textMessage}>{i.text}</span>
          </div>
        ) : null,
      )}
    </div>
  )
}

const ActivePlanTable = ({
  loading,
  athlets,
  messages,
  getMessagesForAthlete,
  sortField,
  replyAthlete,
}) => {
  const rowClassName = item => {
    if (item.riskLevel === 1) {
      return css.danger
    }
    if (item.riskLevel === 2) {
      return css.warning
    }
    return css.success
  }

  const user = (nickname, user) => (
    <div className={css.wrapperUserLink} onClick={() => replyAthlete(user)}>
      <Link to={`/athletes/${user.userId}/plan`} className={css.userLink}>
        <UserInfo
          user={{ nickname, avatar: user.avatar }}
          event={user.userInfo?.event?.name}
          badge={user.invited && 'Invite sent'}
        />
      </Link>
      {sortField !== 'date' && user.hasPain && (
        <IconAntd type='warning' theme='filled' className={css.iconWarning} />
      )}
    </div>
  )

  const action = (_, user) => {
    return (
      <div className={css.wrapperActions}>
        <Tooltip
          title='EDIT'
          content={
            <Link to={`/athletes/${user.userId}/plan`} face={Link.FACE_DEFAULT}>
              <Icon type='edit' size='medium' />
            </Link>
          }
        />

        <Tooltip
          title='COMMENTS'
          content={
            <Popover
              trigger='click'
              content={<Messages messages={messages} />}
              title='Athlete`s Comments'
              onVisibleChange={() => getMessagesForAthlete(user.userId)}
              overlayClassName={css.popoverMessages}
            >
              <Icon type='message' size='medium' />
            </Popover>
          }
        />
      </div>
    )
  }

  const workout = value => (
    <Tooltip
      title={value?.name?.toUpperCase()}
      className={css.workoutTooltip}
      content={getTypeIcon(value?.workoutStatusId)}
    />
  )

  const timeToRace = value => <div className={css.timeText}>{value}</div>

  return (
    <Table
      className={css.tableOfActivelLan}
      loading={loading}
      rowClassName={rowClassName}
      locale={{
        emptyText: athlets?.length === 0 ? 'No data' : 'No results found',
      }}
      customColumns={columns.planClients({
        action,
        user,
        workout,
        timeToRace,
      })}
      dataSource={athlets}
    />
  )
}

export default ActivePlanTable
