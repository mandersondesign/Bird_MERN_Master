import React from 'react'
import PropTypes from 'prop-types'
import { Col, Layout, Row } from 'antd'

import styles from './styles.less'

const AntdContent = Layout.Content

const sizeOptions = {
  sm: {
    offset: { span: 10, offset: 1 },
    full: { span: 12 },
  },
  xs: { span: 12 },
}

const { sm, xs } = sizeOptions

const Content = ({ children, fullWidth }) => {
  const smSize = fullWidth ? sm.full : sm.offset

  return (
    <AntdContent className={styles.root}>
      <Row>
        <Col xs={xs} sm={smSize}>
          {children}
        </Col>
      </Row>
    </AntdContent>
  )
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
}

Content.defaultProps = {
  fullWidth: false,
}

export default Content
