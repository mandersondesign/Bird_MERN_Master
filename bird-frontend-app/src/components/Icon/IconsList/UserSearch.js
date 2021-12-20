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
      grad={props.value ? props.value : undefined}
    >
      <defs>
        <path id='a' d='M0 16.614V0H16.615v16.614H0z' />
      </defs>
      <g fill='none' fillRule='evenodd'>
        <g transform='translate(1 1)'>
          <path fill={props.fill || '#4A4A4A'} fillRule='evenodd' d='M19.734 18.486l-3.924-3.93a6.549 6.549 0 0 0-.592-8.625A6.517 6.517 0 0 0 10.571 4a6.517 6.517 0 0 0-4.647 1.931 6.59 6.59 0 0 0 0 9.306 6.517 6.517 0 0 0 4.647 1.932 6.46 6.46 0 0 0 3.968-1.34l3.946 3.908a.877.877 0 0 0 .635.263c.22 0 .46-.088.636-.263.329-.33.329-.9-.022-1.251zm-9.141-3.095c-1.293 0-2.477-.505-3.398-1.405-1.863-1.865-1.863-4.916 0-6.804a4.771 4.771 0 0 1 3.398-1.404c1.293 0 2.477.505 3.398 1.404.92.9 1.403 2.107 1.403 3.402s-.505 2.48-1.403 3.402c-.9.922-2.127 1.405-3.398 1.405z' />
        </g>
      </g>
    </svg>
  )
}
