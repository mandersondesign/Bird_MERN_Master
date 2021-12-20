import React from 'react'

export default function Information (props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 24 24'
      {...props}
    >
      <g fill='#4A4A4A' fillRule='evenodd'>
        <path d='M12.96 7.91a1.032 1.032 0 1 1 0 0M12 4c-4.411 0-8 3.589-8 8 0 4.412 3.589 8.001 8 8.001s8-3.589 8-8.001c0-4.411-3.589-8-8-8m0 18.001C6.486 22.001 2 17.515 2 12 2 6.486 6.486 2 12 2s10 4.486 10 10c0 5.515-4.486 10.001-10 10.001' />
        <path d='M11.927 17.935a1 1 0 0 1-1-1v-4.989a1 1 0 1 1 2 0v4.99a1 1 0 0 1-1 1' />
      </g>
    </svg>
  )
}
