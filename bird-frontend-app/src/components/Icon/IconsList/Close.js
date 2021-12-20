import React from 'react'

export default function Close (props) {
  if (props.grad) {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' width={props.size} height={props.size} {...props}>
        <linearGradient id='linear-gradient'>
          <stop offset='0%' stopColor='rgb(0, 177, 64)' />
          <stop offset='17%' stopColor='rgb(188, 218, 0)' />
          <stop offset='66%' stopColor='rgb(188, 218, 0)' />
          <stop offset='100%' stopColor='rgb(0, 177, 64)' />
        </linearGradient>

        <path
          fill='url(#linear-gradient)'
          d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z'
        />
      </svg>
    )
  }
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 16 16'
      {...props}
    >
      <path
        fill='#4A4A4A'
        fillRule='evenodd'
        d='M13.935 12.972L8.985 8.04l4.95-4.93a.65.65 0 0 0-.916-.921L8.064 7.124 3.109 2.19a.65.65 0 1 0-.917.92l4.95 4.93-4.95 4.932a.649.649 0 0 0 .458 1.11.65.65 0 0 0 .459-.19l4.955-4.934 4.955 4.935a.646.646 0 0 0 .458.189.65.65 0 0 0 .458-1.11'
      />
    </svg>
  )
}
