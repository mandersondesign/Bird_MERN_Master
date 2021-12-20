import React from 'react'

export default function Asset (props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 16 16'
      {...props}
    >
      <path
        fill='#4BC126'
        fillRule='evenodd'
        d='M6.741 15.374a.94.94 0 0 1-.816-.472L.537 5.525a.941.941 0 0 1 1.632-.938l4.572 7.957L13.657.52a.941.941 0 0 1 1.631.937l-7.73 13.445a.94.94 0 0 1-.817.472'
      />
    </svg>
  )
}
