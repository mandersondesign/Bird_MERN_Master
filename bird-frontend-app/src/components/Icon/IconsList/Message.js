import React from 'react'

export default function Message (props) {
  if (props.grad) {
    return (
      <svg width={props.size} height={props.size} {...props}>
        <defs>
          <linearGradient id='m' x1='368.569%' x2='-16.997%' y1='2.95%' y2='2.95%'>
            <stop offset='0%' stopColor='#00B140' />
            <stop offset='16.588%' stopColor='#BCDA00' />
            <stop offset='59.714%' stopColor='#BCDA00' />
            <stop offset='100%' stopColor='#00B140' />
          </linearGradient>
        </defs>
        <path
          fill='url(#m)'
          d='M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H6L4,18V4H20'
        />
      </svg>
    )
  }
  return (
    <svg viewBox='0 0 24 24' width={props.size} height={props.size} {...props}>
      <path
        fill='#000000'
        d='M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H6L4,18V4H20'
      />
    </svg>
  )
}
