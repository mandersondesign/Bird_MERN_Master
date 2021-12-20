import React from 'react'

export default function Undo ({ size, color = '#252c34', grad, ...props }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} {...props} viewBox='0 0 24 24'><path d='M12 0c-3.31 0-6.291 1.353-8.459 3.522l-2.48-2.48-1.061 7.341 7.437-.966-2.489-2.488c1.808-1.808 4.299-2.929 7.052-2.929 5.514 0 10 4.486 10 10s-4.486 10-10 10c-3.872 0-7.229-2.216-8.89-5.443l-1.717 1.046c2.012 3.803 6.005 6.397 10.607 6.397 6.627 0 12-5.373 12-12s-5.373-12-12-12z' opacity='.5' fill={color} /></svg>
  )
}
