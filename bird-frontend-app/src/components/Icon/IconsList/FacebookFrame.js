import React from 'react'

export default function FacebookFrame (props) {
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
        <g transform='translate(3 3)'>
          <path
            fill='#4A4A4A'
            d='M4.924 2A2.926 2.926 0 0 0 2 4.921v20.155A2.928 2.928 0 0 0 4.924 28h20.155a2.926 2.926 0 0 0 2.92-2.924V4.921C28 3.311 26.69 2 25.08 2H4.924zm20.155 28H4.924A4.93 4.93 0 0 1 0 25.076V4.921A4.928 4.928 0 0 1 4.924 0h20.155a4.926 4.926 0 0 1 4.92 4.921v20.155A4.928 4.928 0 0 1 25.08 30z'
          />
        </g>
        <path
          fill='#4A4A4A'
          d='M17.986 32V21.165h-3.42v-3.967h3.42v-2.926c0-3.386 2.087-5.234 5.113-5.234 1.44 0 2.687.103 3.045.153v3.541l-2.087.018c-1.658 0-1.966.771-1.966 1.915v2.533h3.916l-.51 3.967H22.09V32'
        />
      </g>
    </svg>
  )
}
