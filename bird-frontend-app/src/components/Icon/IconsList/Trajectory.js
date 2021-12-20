import React from 'react'

export default function Trajectory (props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 36 36'
      {...props}
    >
      <g fill='#4A4A4A' fillRule='evenodd'>
        <path d='M18 34c-6.182 0-11.873-3.619-14.497-9.221a1 1 0 1 1 1.811-.847C7.611 28.833 12.59 32 18 32c7.72 0 14-6.28 14-14S25.72 4 18 4C10.617 4 4.55 9.745 4.035 17h17.001a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1C2 9.178 9.178 2 18 2s16 7.178 16 16-7.178 16-16 16' />
        <path d='M17.95 24.651a.999.999 0 0 1-.707-1.707L22.185 18l-4.944-4.947a.999.999 0 1 1 1.414-1.414l5.651 5.654a.999.999 0 0 1 0 1.414l-5.65 5.651a.997.997 0 0 1-.708.293' />
      </g>
    </svg>
  )
}
