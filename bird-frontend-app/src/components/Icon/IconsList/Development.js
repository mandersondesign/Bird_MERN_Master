import React from 'react'

export default function Development (props) {
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
          d='M62.628 8.439a1.502 1.502 0 0 0-1.561-1.437l-9.006.372a1.5 1.5 0 0 0-1.438 1.56 1.493 1.493 0 0 0 1.56 1.437l5.648-.233-22.013 24.924-6.155-11.238a1.497 1.497 0 0 0-2.437-.275L.378 53.831a1.499 1.499 0 1 0 2.244 1.99l25.434-28.687 6.158 11.242a1.5 1.5 0 0 0 2.439.273L59.79 12.45l.21 5.118a1.5 1.5 0 0 0 1.498 1.438l.063-.001a1.5 1.5 0 0 0 1.437-1.56l-.371-9.006z'
        />
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
        d='M34.833 5.959a1.005 1.005 0 0 0-1.04-.958l-4.809.198c-.551.023-.98.489-.958 1.04.023.552.486.962 1.04.958l2.548-.105L20.36 19.836l-3.15-5.751a.998.998 0 0 0-.765-.513.98.98 0 0 0-.86.33L1.252 30.069a1 1 0 0 0 1.496 1.327l13.391-15.104 3.151 5.754a.999.999 0 0 0 1.627.182L32.941 8.613l.092 2.236a1 1 0 0 0 .998.959l.042-.001a.999.999 0 0 0 .958-1.04l-.198-4.808z'
      />
    </svg>
  )
}
