import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import cn from 'classnames'

import Icon from '../Icon'
import styles from './styles.less'

const SectionTitle = props => {
  const { className, icon, iconPos, text, link, addInfo } = props
  const rootClass = cn(styles.sectionTitle, className)
  let addInfoClass = ''
  if (addInfo) {
    addInfoClass = typeof addInfo === 'string'
      ? cn(styles.sectionTitleAdd, styles.sectionTitleAddString)
      : cn(styles.sectionTitleAdd, styles.sectionTitleAddNumber)
  }
  const titleCss = icon && iconPos === 'left' ? { marginLeft: 13 } : { marginRight: 13 }

  const getContent = () => (
    <div className={styles.sectionTitleWrap}>
      {icon && iconPos === 'left' && <Icon svg type={icon} size={36} />}
      <span className={styles.sectionTitleText} style={titleCss}>
        {text}
      </span>
      {icon && iconPos === 'right' && <Icon svg type={icon} size={36} />}
    </div>
  )

  return (
    <div className={rootClass}>
      {!link && getContent()}
      <div className={styles.sectionTitleWrap}>
        {link && (
          link.indexOf('://') === -1 ? (
            <NavLink to={link} className={styles.sectionTitleLink}>
              {getContent()}
            </NavLink>
          ) : (
            <a href={link} className={styles.sectionTitleLink}>
              {getContent()}
            </a>
          ))}
        {addInfo && <span className={addInfoClass}>{addInfo}</span>}
      </div>
    </div>
  )
}

SectionTitle.propTypes = {
  icon: PropTypes.string,
  iconPos: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.string,
  addInfo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
}

SectionTitle.defaultProps = {
  icon: '',
  iconPos: 'left',
  text: '',
  link: '#',
  addInfo: '',
  className: '',
}

export default SectionTitle
