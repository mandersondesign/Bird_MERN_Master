import React from 'react'

export default function Risks (props) {
  if (props.grad) {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        href='http://www.w3.org/1999/xlink'
        width={
          props.size
        }
        height={
          props.size
        }
        viewBox='0 0 64 64'
      >
        <defs>
          <path
            id='a'
            d='M0 0H43.69v63H0z'
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
          transform='translate(9 1)'
        >
          <path
            fill='url(#b)'
            d='M14.602 63a1.498 1.498 0 0 1-1.484-1.711l3.836-26.982a1.506 1.506 0 0 1 1.695-1.275 1.5 1.5 0 0 1 1.274 1.697l-3.095 21.78L38.974 30.07H24.948a1.501 1.501 0 0 1-1.483-1.726l3.328-21.771-22.08 26.359h5.064a1.5 1.5 0 0 1 0 3H1.5a1.502 1.502 0 0 1-1.15-2.463L27.936.537a1.5 1.5 0 0 1 2.634 1.19L26.695 27.07h15.493a1.5 1.5 0 1 1 1.15 2.463l-27.586 32.93a1.497 1.497 0 0 1-1.15.537'
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
        d='M12.988 35a1.002 1.002 0 0 1-.99-1.141l2.046-14.39a1.001 1.001 0 0 1 1.981.281l-1.554 10.922L25.56 17.438h-7.053a.999.999 0 0 1-.989-1.153l1.667-10.904L8.142 18.563h2.272a1 1 0 1 1 0 2H6a1 1 0 0 1-.767-1.642L19.946 1.356a.999.999 0 1 1 1.755.794l-2.03 13.287h8.03a1 1 0 0 1 .767 1.642L13.755 34.643a1.003 1.003 0 0 1-.767.357'
      />
    </svg>
  )
}
