import React from 'react'

export default function Event (props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width={props.size}
      height={props.size}
      viewBox='0 0 36 36'
      {...props}
    >
      <g fill='none' fillRule='evenodd' transform='translate(2 1)'>
        <path
          fill={props.fill || '#4A4A4A'}
          d='M2 12.094v-3.99a3.412 3.412 0 0 1 3.408-3.408h3.79v3.43a1 1 0 1 0 2 0v-3.43h9.682v3.43a1 1 0 1 0 2 0v-3.43h3.791a3.411 3.411 0 0 1 3.406 3.408v3.99H2zm24.671-9.398H22.88V1a1 1 0 1 0-2 0v1.696h-9.682V1a1 1 0 0 0-2 0v1.696h-3.79A5.413 5.413 0 0 0 0 8.104v18.49A5.413 5.413 0 0 0 5.408 32h21.263a1 1 0 1 0 0-2H5.408A3.411 3.411 0 0 1 2 26.594v-12.5h28.077v12.5a1 1 0 1 0 2 0V8.104a5.412 5.412 0 0 0-5.406-5.408z'
        />
      </g>
    </svg>
  )
}
