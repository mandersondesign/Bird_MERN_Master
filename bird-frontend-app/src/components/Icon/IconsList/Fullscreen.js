import React from 'react'

export default function Fullscreen (props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 24 24'
      {...props}
    >
      <g fill='#fff' fillRule='evenodd'>
        <path d='M1.9 15.877a.9.9 0 0 1-.9-.9v-7.43A3.551 3.551 0 0 1 4.546 4h11.247a.9.9 0 1 1 0 1.801H4.546c-.962 0-1.746.783-1.746 1.747v7.429a.9.9 0 0 1-.9.9M19.252 20.46H8.77a.9.9 0 0 1 0-1.8h10.482A1.75 1.75 0 0 0 21 16.912v-6.664a.9.9 0 1 1 1.8 0v6.664a3.552 3.552 0 0 1-3.549 3.549' />
      </g>
    </svg>
  )
}
