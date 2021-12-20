import React from 'react'

export default function Ok (props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 36 36'
      {...props}
    >
      <g fill='#4A4A4A' fillRule='evenodd'>
        <path d='M18 4C10.28 4 4 10.28 4 18s6.28 14 14 14 14-6.28 14-14S25.72 4 18 4m0 30C9.178 34 2 26.822 2 18S9.178 2 18 2s16 7.178 16 16-7.178 16-16 16' />
        <path d='M17.215 24.94a.998.998 0 0 1-.867-.503l-5.367-9.34a1 1 0 0 1 1.734-.996l4.5 7.832 6.834-11.884a1 1 0 0 1 1.734.996l-7.701 13.393a1 1 0 0 1-.867.502' />
      </g>
    </svg>
  )
}
