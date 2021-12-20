import React from 'react'

export default function CustomDashboard ({ size, color = '#252c34', grad, ...props }) {
  return (
    <svg viewBox='0 0 18 18' width={size} height={size} {...props} xmlns='http://www.w3.org/2000/svg'>
      <path d='M0,10 L8,10 L8,0 L0,0 L0,10 L0,10 Z M0,18 L8,18 L8,12 L0,12 L0,18 L0,18 Z M10,18 L18,18 L18,8 L10,8 L10,18 L10,18 Z M10,0 L10,6 L18,6 L18,0 L10,0 L10,0 Z' id='dashboard' />
    </svg>
  )
}
