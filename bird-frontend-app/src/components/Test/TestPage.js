import React from 'react'
import { generatePath } from 'react-router'

import { UserMenu, UserInfo } from 'components/User'
import { Button } from 'components/CustomButton'
import { Link } from 'components/Link'
import { Sprite } from 'components/Sprite'
import { Icon } from 'components/CustomIcon'
import Table from 'components/Table'

import bem from 'utils/bem'

import { columns, dataSource } from './data'
import './TestPage.scss'

export const TestPagePropTypes = {}

export const TestPageDefaultProps = {}

const { FACES, SIZES } = Button

export class TestPage extends React.PureComponent {
  static propTypes = { ...TestPagePropTypes };

  static defaultProps = { ...TestPageDefaultProps };

  static className = 'TestPage';

  user = (nickname, { picture, invited, id }) => (
    <UserInfo
      key={id}
      user={{ nickname, picture }}
      badge={invited ? 'Invite sent' : undefined}
    />
  );

  active = value => (
    <div className={bem.element(this, 'row', 'active')}>
      {value && <Sprite type='check' className={bem.element(this, 'icon', 'check')} />}
    </div>
  );

  action = (_, { id }) => (
    <div className={bem.element(this, 'row', 'action')}>
      <Link
        to={generatePath('/', { id })}
        face={Link.FACE_DEFAULT}
        className={bem.element(this, 'rowLink', 'edit')}
      >
        <Icon type='plus' size='medium' />
      </Link>
      <Link
        to={generatePath('/', { id })}
        face={Link.FACE_DEFAULT}
        className={bem.element(this, 'rowLink', 'delete')}
      >
        <Icon type='can' size='medium' />
      </Link>
    </div>
  );

  render () {
    return (
      <div className={bem.block(this)}>
        {
          FACES.map(face => (
            <div key={Date.now()} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <label htmlFor={`button-${face}`} style={{ width: 100 }}>
                {face}:
              </label>
              <Button
                size={SIZES[1]}
                id={`button-${face}`}
                face={face}
                onClick={() => {}}
              >INVITE
              </Button>
            </div>
          ))
        }
        <div className={bem.element(this, 'userMenu')}>
          <UserMenu
            user={{
              nickname: 'Test User',
              picture: 'https://klike.net/uploads/posts/2018-06/1528720172_1.jpg',
            }}
            settings-to='/settings'
            logout-to='/logout'
          />
        </div>
        <Table
          withRowSelection
          loading={false}
          locale={{ emptyText: dataSource.clients?.length === 0 ? 'No data' : 'No results found' }}
          customColumns={columns.clients({ active: this.active, action: this.action, user: this.user })}
          dataSource={dataSource.clients}
        />
      </div>
    )
  }
}
