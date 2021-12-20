import React from 'react'

export default function Post ({ size, color = '#252c34', grad, ...props }) {
  return (
    <svg viewBox='0 0 14 12' width={size} height={size} {...props} xmlns='http://www.w3.org/2000/svg'>
      <path d='M8.8 8.1V6.9H14v3.9c0 .3-.1.6-.4.9-.3.2-.6.3-.9.3H1.3c-.3 0-.7-.1-.9-.4-.3-.2-.4-.5-.4-.9V6.9h5.2v1.3c0 .1 0 .2.1.3s.2.1.3.1h2.6c.1 0 .2 0 .3-.1s.3-.2.3-.4zm3.9-5.5c.3 0 .7.1.9.4s.4.5.4.9V6H0V3.9c0-.4.1-.7.4-.9s.6-.4.9-.4h2.2V1.3c0-.3.1-.6.4-.9s.6-.4.9-.4h4.4c.3 0 .7.1.9.4s.4.6.4.9v1.3h2.2zm-3.9 0v-.9H5.2v.9h3.6z' opacity='.5' fill={color} />
    </svg>
  )
}
