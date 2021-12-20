import React from 'react'
import styles from './styles.less'

export default function iconSvg (props) {
  return (
    <svg width={props.size} height={props.size} viewBox='0 0 36 36' className={styles.iconProgress}>
      <path
        d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
        fill='none'
        stroke='#444'
        strokeWidth='3'
        strokeDasharray={`${props.percent}, 100`}
      />
    </svg>
  )
}
