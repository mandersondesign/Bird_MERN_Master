import React from 'react'

export default function ArrowWoStem (props) {
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
        d='M8 20.487a.999.999 0 0 1-.701-1.713l6.594-6.479-6.48-6.594A.999.999 0 1 1 8.839 4.3l7.182 7.307a1.001 1.001 0 0 1-.013 1.414L8.701 20.2a1 1 0 0 1-.701.287'
      />
    </svg>
  )
}
