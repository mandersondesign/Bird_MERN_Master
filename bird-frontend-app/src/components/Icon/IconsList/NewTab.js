import React from 'react'

export default function NewTab (props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width={props.size}
      height={props.size}
      viewBox='0 0 16 16'
      {...props}
    >
      <g fill='none' fillRule='evenodd' transform='translate(0 3)'>
        <path
          fill='#4A4A4A'
          d='M9.024.002L4.817 0a.6.6 0 1 0 0 1.2h2.758l-7.4 7.4a.601.601 0 0 0 .848.85l7.401-7.402v2.758a.6.6 0 1 0 1.2 0V.601a.6.6 0 0 0-.6-.6'
        />
      </g>
    </svg>
  )
}
