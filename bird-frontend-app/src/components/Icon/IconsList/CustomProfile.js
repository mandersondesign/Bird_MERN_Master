import React from 'react'

export default function CustomDashboard ({ size, color = '#252c34', grad, ...props }) {
  return (
    <svg viewBox='6 5 18 18' width={size} height={size} {...props} xmlns='http://www.w3.org/2000/svg'>
      <path id='a' d='M15 15c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
    </svg>
  )
}
