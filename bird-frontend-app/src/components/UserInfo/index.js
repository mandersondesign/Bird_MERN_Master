import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'antd'
import Dotdotdot from 'react-dotdotdot'
import Lightbox from 'react-images'
import { get } from 'lodash'
import userPick from './user.png'

import css from './styles.less'

class UserInfo extends React.Component {
    state = {
      lightboxIsOpen: false,
    }

    closeLightbox = () => this.setState({ lightboxIsOpen: false })

    openLightbox = () => this.setState({ lightboxIsOpen: true })

    render () {
      const { item, title } = this.props
      const { lightboxIsOpen } = this.state

      return (
        <div className={css.root}>
          <h1>{title}</h1>
          <div className={css.galleryContainer}>
            <ul className={css.gallery}>
              <li className={`${css.galleryItem} ${css.active}`}>
                <img
                  src={item.imageUrl || userPick}
                  alt='user avatar'
                  onClick={this.openLightbox}
                />
              </li>
            </ul>
          </div>
          {item.imageUrl && (
            <Lightbox
              backdropClosesModal
              showThumbnails
              onClickThumbnail={() => {}}
              images={[{ src: item.imageUrl }]}
              isOpen={lightboxIsOpen}
              onClose={this.closeLightbox}
            />
          )}
          <Dotdotdot clamp={7} className={css.infoContainer}>
            <h3 className={css.name}>{item.name || ''}</h3>
            {item.description && <div className={css.description}>{item.description || ''}</div>}
            {item.main && <div className={css.main}>{item.main || ''}</div>}
          </Dotdotdot>
          <Dotdotdot clamp={7} className={css.infoContainer}>
            <Row gutter={8}>
              <Col span={3} className='text-muted'>Username</Col>
              <Col span={3} className='text-muted'>Email</Col>
              <Col span={3} className='text-muted'>Organization</Col>
              <Col span={3} className='text-muted'>Country</Col>
            </Row>
            <Row gutter={8}>
              <Col span={3}>{get(item, 'username') || ''}</Col>
              <Col span={3}>{get(item, 'email') || ''}</Col>
              <Col span={3}>{get(item, 'organization') || ''}</Col>
              <Col span={3}>{`${get(item, 'country') || ''}`}</Col>
            </Row>
          </Dotdotdot>
        </div>
      )
    }
}

UserInfo.propTypes = {
  item: PropTypes.object,
  title: PropTypes.string,
}

UserInfo.defaultProps = {
  item: {},
  title: 'User info',
}

export default UserInfo
