import React from 'react'

export default function Bookmark (props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='#4A4A4A'
        fillRule='evenodd'
        d='M4 23a1.004 1.004 0 0 1-1-1V2a1 1 0 0 1 1-1h14.864a1 1 0 1 1 0 2H5v16.92l6.383-5.105a.997.997 0 0 1 1.259.008l6.168 5.063V7.911a1 1 0 0 1 2 0V22a1 1 0 0 1-1.634.773l-7.177-5.89-7.374 5.898A1.004 1.004 0 0 1 4 23'
      />
    </svg>
  )
}
