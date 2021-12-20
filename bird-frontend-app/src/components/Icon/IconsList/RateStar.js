import React from 'react'

export default function RateStar (props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 15 15'
      {...props}
    >
      <path
        fillRule='evenodd'
        stroke='#9B9B9B'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.4'
        d='M11.951 5.249l2.049.51-2.795 3.34.312 4.36L7.5 11.811l-4.017 1.646.312-4.358L1 5.759 5.21 4.71 7.5 1l2.29 3.711'
      />
    </svg>
  )
}
