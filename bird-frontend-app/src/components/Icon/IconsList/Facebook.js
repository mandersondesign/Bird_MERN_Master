import React from 'react'

export default function Facebook (props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width={props.size}
      height={props.size}
      viewBox='0 0 36 36'
      {...props}
    >
      <g fill='none' fillRule='evenodd'>
        <path
          fill='#4A4A4A'
          d='M17.986 32V21.165h-3.42v-3.967h3.42v-2.926c0-3.386 2.087-5.234 5.113-5.234 1.44 0 2.687.103 3.045.153v3.541l-2.087.018c-1.658 0-1.966.771-1.966 1.915v2.533h3.916l-.51 3.967H22.09V32'
        />
      </g>
    </svg>
  )
}
