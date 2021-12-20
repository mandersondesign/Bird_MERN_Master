import React from 'react'

export default function Course (props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 36 36'
      {...props}
    >
      <path
        fill='none'
        fillRule='evenodd'
        stroke='#4A4A4A'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M22.922 18.955L18 21.152 2 14.008l16-7.144 16 7.144-6.449 2.901.02 6.124c0 3.38-4.294 6.12-9.588 6.12-4.875 0-8.902-2.323-9.51-5.328'
      />
    </svg>
  )
}
