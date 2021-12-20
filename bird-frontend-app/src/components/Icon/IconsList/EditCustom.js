import React from 'react'

export default function EditCustom ({ size, color = '#3831FF', grad, ...props }) {
  return (
    <svg viewBox='0 0 20 20' width={size} height={size} {...props} xmlns='http://www.w3.org/2000/svg'>
      <path
        opacity='1' fill={color} fillRule='evenodd'
        d='M11.574 4.041l-7.7 7.742a.885.885 0 0 0-.254.55l-.283 3.376a.886.886 0 0 0 .229.673.876.876 0 0 0 .648.285h.055l3.426-.221a.876.876 0 0 0 .567-.256l7.697-7.74a2.434 2.434 0 0 0 0-3.433l-.977-.976a2.405 2.405 0 0 0-3.408 0zM7.252 14.707l-2.08.132.17-2.036 5.738-5.77 1.9 1.912-5.728 5.762zm7.463-7.503l-.494.496-1.9-1.91.493-.497a.656.656 0 0 1 .93 0l.97.975a.665.665 0 0 1 0 .936z'
      />
    </svg>
  )
}
