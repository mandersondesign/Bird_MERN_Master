import React from 'react'

export default function Star (props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='#4A4A4A'
        fillRule='evenodd'
        d='M3.835 9.805L7.533 13.4a.905.905 0 0 1 .26.797l-.867 5.086 4.564-2.407a.906.906 0 0 1 .838-.001l4.568 2.396-.877-5.083a.9.9 0 0 1 .258-.797l3.69-3.605-5.106-.737a.895.895 0 0 1-.678-.491l-2.288-4.624-2.279 4.63a.902.902 0 0 1-.677.493l-5.104.747zM5.732 21.83a.903.903 0 0 1-.887-1.051l1.094-6.417-4.667-4.538a.904.904 0 0 1-.229-.923.903.903 0 0 1 .727-.614l6.44-.942 2.875-5.842A.904.904 0 0 1 11.892 1h.001c.342 0 .655.195.807.5l2.886 5.836 6.442.93a.899.899 0 0 1 .501 1.534l-4.656 4.549 1.107 6.413a.9.9 0 0 1-1.305.95l-5.764-3.022-5.759 3.036a.906.906 0 0 1-.42.104z'
      />
    </svg>
  )
}
