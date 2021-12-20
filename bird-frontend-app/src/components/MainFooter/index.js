import React from 'react'
import PropTypes from 'prop-types'
import { Col, Icon as IconAnt, Row } from 'antd'
import Icon from '../Icon'
import MenuList from '../MenuList'
import Content from '../Content'
import Logotype from '../../common-ui/Logotype'

import styles from './styles.less'

const windowWidth = () => window.innerWidth

const BREAK_POINT_MOBILE = 667

class MainFooter extends React.Component {
  state = {
    model: this.props.data,
    openMenu: [],
  }

  componentDidMount () {
    this.setMenuItemState()
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    if (windowWidth() > BREAK_POINT_MOBILE) {
      this.setMenuItemState()
    }
  }

  setMenuItemState = () => {
    const currentMenuContentStates = this.state.model.map(() => true)
    this.setState({ openMenu: currentMenuContentStates })
  }

  getColumnGrid = index => {
    switch (index) {
    case 0:
      return { span: 3, offset: 1 }
    case 1:
      return { span: 5 }
    case 2:
      return { span: 2, offset: 1 }
    default:
      return null
    }
  }

  toggleMenuContent = index => {
    const currentMenuContentStates = this.state.openMenu.slice()
    currentMenuContentStates[index] = !currentMenuContentStates[index]
    this.setState({ openMenu: currentMenuContentStates })
  }

  render () {
    return (
      <div className={styles.footer}>
        <Content fullWidth className={styles.footerMenu}>
          <Row className={styles.footerMenuContent}>
            {this.props.logotype && !this.props.logotype.isHide && (
              <Col sm={{ span: 11, offset: 1 }}>
                <Logotype currentRoute={this.props.logotype.currentRoute} className={styles.logo} />
              </Col>
            )}
            {this.state.model.map((e, i) => (
              <Col key={i} sm={this.getColumnGrid(i)} className={styles.footerMenuContentWrap}>
                {this.state.openMenu[i] ? (
                  <button
                    type='button'
                    className={styles.footerMenuContentBtn}
                    onClick={ev => this.toggleMenuContent(i)}
                  >
                    <IconAnt type='minus' />
                  </button>
                ) : (
                  <button
                    type='button'
                    className={styles.footerMenuContentBtn}
                    onClick={ev => this.toggleMenuContent(i)}
                  >
                    <IconAnt type='plus' />
                  </button>
                )}
                <MenuList list={[e]} isOpen={this.state.openMenu[i]} />
              </Col>
            ))}
          </Row>
          <Row className={styles.footerInfo}>
            <Col sm={{ span: 3, offset: 1 }} className={styles.footerInfoDs}>&copy; 2017 Деловая среда</Col>
            <Col sm={8} className={styles.footerInfoAl}>
              <div className={styles.footerInfoLogo}>
                <Icon svg type='lebedevLogo' />
              </div>
              <div className={styles.footerInfoText}>
                <span>Задизайнено в </span>
                <a href='https://www.artlebedev.ru/' target='_blank' rel='noopener noreferrer'>
                  Студии Артемия Лебедева
                </a>
                <br />
                <a href='/' target='_blank' rel='noopener noreferrer'>
                  Информация о сайте
                </a>
              </div>
            </Col>
          </Row>
        </Content>
      </div>
    )
  }
}

MainFooter.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  logotype: PropTypes.shape({
    isHide: PropTypes.bool,
    currentRoute: PropTypes.string,
  }),

}

MainFooter.defaultProps = {
  data: [],
  logotype: {
    isHide: true,
    currentRoute: '',
  },
}

export default MainFooter
