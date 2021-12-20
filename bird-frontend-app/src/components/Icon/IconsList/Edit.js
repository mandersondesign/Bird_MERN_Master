import React from 'react'

export default function Edit ({ size, color = '#252c34', grad, ...props }) {
  return (
    <svg viewBox='0 0 14 14' width={size} height={size} {...props} xmlns='http://www.w3.org/2000/svg'>
      <path d='M11.5 6l-7.6 7.6-3.2.4c-.2 0-.4 0-.5-.2s-.2-.3-.2-.5l.4-3.1L8 2.5 11.5 6zm2.1-4c.3.3.4.6.4 1s-.1.7-.4.9L12 5.5 8.6 1.9 10.2.3c.2-.2.5-.3.8-.3s.7.1.9.4L13.6 2z' opacity='.5' fill={color} />
    </svg>
  )
}
