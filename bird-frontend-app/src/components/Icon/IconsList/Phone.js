import React from 'react'

export default function Phone ({ size, color = '#252c34', grad, ...props }) {
  return (
    <svg viewBox='0 0 14 14' width={size} height={size} {...props} xmlns='http://www.w3.org/2000/svg'>
      <path d='M13.5.7c.2 0 .3.1.4.2s.1.3.1.4c0 2.3-.6 4.4-1.7 6.4-1.1 1.9-2.7 3.4-4.6 4.6-2 1.1-4.1 1.7-6.4 1.7-.1 0-.3 0-.4-.1s-.2-.2-.2-.4L0 10.6c0-.1 0-.3.1-.4l.3-.3 3.1-1.3c.1-.1.3-.1.4 0 .1 0 .3.1.4.2l1.3 1.6c1.1-.5 2-1.2 2.9-2 .8-.8 1.5-1.8 2-2.8L8.8 4.2c-.1-.1-.2-.2-.2-.3v-.4L9.9.4l.3-.3c.1-.1.3-.1.4-.1l2.9.7z' opacity='.5' fill={color} />
    </svg>
  )
}
