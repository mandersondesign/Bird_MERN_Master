import React from 'react'

export default function Lock ({ size, color = '#252c34', grad, ...props }) {
  return (
    <svg viewBox='0 0 12.1 14.1' width={size} height={size} {...props} xmlns='http://www.w3.org/2000/svg'>
      <path d='M11.7 6.5c-.3-.3-.6-.4-.9-.4h-.4V4.5c0-.8-.2-1.5-.6-2.2C9.4 1.6 8.9 1 8.2.6 7.6.2 6.8 0 6.1 0c-.8 0-1.6.2-2.2.6-.7.4-1.2.9-1.6 1.6-.4.7-.6 1.4-.6 2.2v1.7h-.4c-.3 0-.7.2-.9.4-.3.3-.4.6-.4 1v5.2c0 .4.1.7.4 1 .2.3.6.4.9.4h9.4c.4 0 .7-.1.9-.4.3-.3.4-.6.4-1V7.5c.1-.4 0-.7-.3-1zM6 1c.6 0 1.2.2 1.7.5.6.2 1 .7 1.3 1.2.3.5.4 1.1.4 1.7v1.7H2.7V4.4c0-.6.2-1.2.4-1.7.3-.5.7-.9 1.2-1.3C4.9 1.1 5.4 1 6 1zM1 7.5c0-.1 0-.2.1-.3.1-.1.2-.1.3-.1h9.4c.1 0 .2 0 .3.1.1.1.1.2.1.3v5.2c0 .1 0 .2-.1.3-.1.1-.2.1-.3.1H1.3c-.1 0-.2 0-.3-.1s0-.1 0-.3V7.5z' opacity='.5' fill={color} />
    </svg>
  )
}
