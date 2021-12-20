import React, { Component } from 'react'
import { Col, EcoFormInput, Row } from 'components'
import css from './styles.less'

export default class AuthController extends Component {
  renderInput = (props, i) => <EcoFormInput key={i} {...props} />

  render(content) {
    return (
      <div className={css.container}>
        <div className={css.inner}>
          <Row type='flex' justify='space-around' align='middle' className={css.mainRow}>
            <Col span={24} height={100}>
              {content.call(this)}
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
