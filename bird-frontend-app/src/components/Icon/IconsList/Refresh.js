import React from 'react'

export default function Refresh (props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width={props.size}
      height={props.size}
      viewBox='0 0 16 16'
      {...props}
    >
      <g fill='none' fillRule='evenodd'>
        <g transform='translate(0 .453)'>
          <path
            fill='#4A4A4A'
            d='M1.27 8.071a5.47 5.47 0 0 1 3.118-5.83c2.12-.969 4.62-.453 6.214 1.224H9.066a.6.6 0 0 0 0 1.2h2.915a.6.6 0 0 0 .6-.6V1.147a.6.6 0 0 0-1.2 0v1.404C9.434.581 6.438-.013 3.89 1.151A6.675 6.675 0 0 0 .083 8.26a.601.601 0 0 0 1.187-.19'
          />
        </g>
        <g transform='translate(0 5.453)'>
          <path
            fill='#4A4A4A'
            d='M13.231 1.158a.601.601 0 0 0-1.186.19 5.47 5.47 0 0 1-3.119 5.83c-2.068.945-4.49.478-6.088-1.095h1.544a.6.6 0 0 0 0-1.2H1.467a.599.599 0 0 0-.599.6V8.4a.598.598 0 1 0 1.198 0l.001-1.368a6.688 6.688 0 0 0 4.605 1.836c.931 0 1.87-.195 2.752-.598a6.676 6.676 0 0 0 3.807-7.112'
          />
        </g>
      </g>
    </svg>
  )
}
