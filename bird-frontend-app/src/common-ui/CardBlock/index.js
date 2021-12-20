import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.less'
import Icon from '../../components/Icon'
import ProgressIcon from './progressIcon'

const CardBlock = ({ status, check, text, position, progress }) => (
  <div className={cn(styles.blockInformation, styles[position])}>
    {status === 'pay' && (
      <button className={styles.blockValue}>
        <span>{text}</span>
      </button>
    )}
    {status === 'free' && (
      <button className={styles.blockValueFree}>
        <span>{text}</span>
      </button>
    )}
    {status === 'done' && (
      <button className={styles.blockValueDone}>
        {check && <Icon className={styles.iconDone} svg type='tick' size={25} />} <span>{text}</span>
      </button>
    )}
    {status === 'progress' && (
      <button className={styles.blockValueDone}>
        <span>
          {progress && progress > 0 && `${progress}%`} {text}
        </span>{' '}
        {progress && <ProgressIcon size={16} percent={progress} />}
      </button>
    )}
  </div>
)

CardBlock.propTypes = {
  status: PropTypes.oneOf(['free', 'done', 'pay', 'progress']),
  check: PropTypes.bool,
  text: PropTypes.string,
  position: PropTypes.string,
  progress: PropTypes.number,
}

CardBlock.defaultProps = {
  status: '',
  check: false,
  text: '',
  position: '',
  progress: 0,
}

export default CardBlock
