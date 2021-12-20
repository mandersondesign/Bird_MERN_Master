import React from 'react'

export default function Feed (props) {
  if (props.grad) {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={props.size}
        height={props.size}
        viewBox='0 0 64 64'
      >
        <defs>
          <linearGradient id='a' x1='100%' x2='0%' y1='50%' y2='50%'>
            <stop offset='0%' stopColor='#8DD010' />
            <stop offset='100%' stopColor='#15B639' />
          </linearGradient>
        </defs>
        <path
          fill='url(#a)'
          fillRule='evenodd'
          d='M49.871 64H14.898C8.338 64 3 58.659 3 52.095V1.5A1.5 1.5 0 0 1 4.5 0h46.37a1.5 1.5 0 0 1 1.5 1.5v47.322a1.5 1.5 0 0 1-3 0V3H6v49.095C6 57.005 9.992 61 14.898 61h34.973c4.906 0 8.898-3.995 8.898-8.905V16.337a1.5 1.5 0 0 1 3 0v35.758C61.77 58.659 56.432 64 49.871 64zm-9.72-49.54H12.791a1.5 1.5 0 1 1 0-3H40.15a1.5 1.5 0 0 1 0 3zm0 9.983H12.791a1.5 1.5 0 1 1 0-3H40.15a1.5 1.5 0 0 1 0 3zm0 9.983H12.791a1.5 1.5 0 1 1 0-3H40.15a1.5 1.5 0 0 1 0 3zm0 9.981H12.791a1.5 1.5 0 1 1 0-3H40.15a1.5 1.5 0 0 1 0 3z'
        />
      </svg>
    )
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 64 64'
      {...props}
    >
      <path
        fill='#4A4A4A'
        fillRule='evenodd'
        d='M49.871 64H14.898C8.338 64 3 58.659 3 52.095V1.5A1.5 1.5 0 0 1 4.5 0h46.37a1.5 1.5 0 0 1 1.5 1.5v47.322a1.5 1.5 0 0 1-3 0V3H6v49.095C6 57.005 9.992 61 14.898 61h34.973c4.906 0 8.898-3.995 8.898-8.905V16.337a1.5 1.5 0 0 1 3 0v35.758C61.77 58.659 56.432 64 49.871 64zm-9.72-49.54H12.791a1.5 1.5 0 1 1 0-3H40.15a1.5 1.5 0 0 1 0 3zm0 9.983H12.791a1.5 1.5 0 1 1 0-3H40.15a1.5 1.5 0 0 1 0 3zm0 9.983H12.791a1.5 1.5 0 1 1 0-3H40.15a1.5 1.5 0 0 1 0 3zm0 9.981H12.791a1.5 1.5 0 1 1 0-3H40.15a1.5 1.5 0 0 1 0 3z'
      />
    </svg>
  )
}
