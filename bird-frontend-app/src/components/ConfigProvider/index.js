import React from 'react'
import PropTypes from 'prop-types'
import { ConfigProvider as ConfigProviderAnt } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import '../../utils/modernizr-custom'

import '../../styles/master.less'

const ConfigProvider = ({ children }) => <ConfigProviderAnt locale={enUS}>{children}</ConfigProviderAnt>

ConfigProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ConfigProvider
