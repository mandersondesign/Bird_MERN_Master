import React from 'react'

export default function Finance (props) {
  if (props.grad) {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={props.size}
        height={props.size}
        viewBox='0 0 64 64'
      >
        <defs>
          <path
            id='a'
            d='M0 0h48.278v64H0z'
          />
          <linearGradient
            id='b'
            x1='100%'
            x2='0%'
            y1='50%'
            y2='50%'
          >
            <stop
              offset='0%'
              stopColor='#8DD010'
            />
            <stop
              offset='100%'
              stopColor='#15B639'
            />
          </linearGradient>
        </defs>
        <g
          fill='none'
          fillRule='evenodd'
          transform='translate(6)'
        >
          <path
            fill='url(#b)'
            d='M21.446 29.7a1.5 1.5 0 1 0 0 3H31.93c9.015 0 16.35-7.334 16.35-16.348C48.278 7.336 40.943 0 31.928 0H13.876a1.5 1.5 0 0 0-1.5 1.5v28.259a1.466 1.466 0 0 0-.394-.06H1.5a1.5 1.5 0 1 0 0 3h10.482c.137 0 .268-.023.394-.058v7.249H1.5a1.5 1.5 0 1 0 0 3h10.876V62.5a1.5 1.5 0 1 0 3 0V42.89h26.16a1.5 1.5 0 1 0 0-3h-26.16V3H31.93c7.36 0 13.35 5.99 13.35 13.352 0 7.36-5.99 13.348-13.35 13.348H21.446z'
          />
        </g>
      </svg>
    )
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 36 36'
      {...props}
    >
      <path
        fill='#4A4A4A'
        fillRule='evenodd'
        d='M20.963 17.58h-5.5a1 1 0 0 0 0 2h5.5c4.847 0 8.79-3.943 8.79-8.789C29.753 5.944 25.81 2 20.963 2h-9.47a1 1 0 0 0-1 1v14.58H5a1 1 0 0 0 0 2h5.493v3.346H5a1 1 0 1 0 0 2h5.493V35a1 1 0 0 0 2 0V24.926h13.51a1 1 0 0 0 0-2h-13.51V4h8.47a6.798 6.798 0 0 1 6.79 6.791 6.797 6.797 0 0 1-6.79 6.789'
      />
    </svg>
  )
}
