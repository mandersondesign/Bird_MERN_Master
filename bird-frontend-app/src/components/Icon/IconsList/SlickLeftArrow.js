import React from 'react'

export default function SlickLeftArrow (props) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={9} height={16} viewBox='0 0 9 16' {...props}>
      <path
        fill='none'
        fillRule='evenodd'
        stroke='#9B9B9B'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M8 1L1 8l7 7'
      />
    </svg>
  )
}
