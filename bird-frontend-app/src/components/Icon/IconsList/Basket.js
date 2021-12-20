import React from 'react'

export default function Basket (props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 24 24'
      {...props}
    >
      <g fill='#4A4A4A' fillRule='evenodd'>
        <path d='M6.078 21h12.308l-.753-10.037H6.83L6.078 21zm13.385 2H5a1 1 0 0 1-.997-1.075l.903-12.036a1 1 0 0 1 .997-.926H18.56a1 1 0 0 1 .997.926l.902 12.036A.998.998 0 0 1 19.463 23zM16.237 6.535a1 1 0 0 1-.99-.87C15.048 4.145 13.752 3 12.231 3a3.058 3.058 0 0 0-3.015 2.665 1.012 1.012 0 0 1-1.122.862 1.001 1.001 0 0 1-.862-1.122C7.562 2.894 9.71 1 12.232 1c2.52 0 4.67 1.894 4.998 4.405a1 1 0 0 1-.993 1.13' />
      </g>
    </svg>
  )
}
