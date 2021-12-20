import React from 'react'

export default function Search (props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width={props.size}
      height={props.size}
      viewBox='0 0 24 24'
      {...props}
    >
      <defs>
        <path id='a' d='M0 16.614V0H16.615v16.614H0z' />
      </defs>
      <g fill='none' fillRule='evenodd'>
        <g transform='translate(1 1)'>
          <path
            fill={props.fill || '#4A4A4A'}
            d='M8.307 2A6.314 6.314 0 0 0 2 8.307a6.314 6.314 0 0 0 6.307 6.307 6.315 6.315 0 0 0 6.308-6.307A6.314 6.314 0 0 0 8.307 2m0 14.614C3.727 16.614 0 12.887 0 8.307S3.727 0 8.307 0s8.308 3.727 8.308 8.307-3.727 8.307-8.308 8.307'
          />
        </g>
        <path
          fill={props.fill || '#4A4A4A'}
          d='M22 23a.997.997 0 0 1-.734-.321l-4.455-4.813a1 1 0 1 1 1.468-1.359l4.455 4.814A1 1 0 0 1 22 23'
        />
      </g>
    </svg>
  )
}
