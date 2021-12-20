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
        fill='#9B9B9B'
        fillRule='evenodd'
        d='M3.567 22.901A.999.999 0 0 1 3 22V2a1 1 0 0 1 1-1h15.81a1 1 0 0 1 1 1v20a1 1 0 0 1-1.634.773l-7.177-5.89-7.374 5.898a1.004 1.004 0 0 1-1.058.12z'
      />
    </svg>
  )
}
