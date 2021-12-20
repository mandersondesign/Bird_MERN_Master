import React from 'react'

export default function Article (props) {
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
        d='M28.605 34H7.396A5.401 5.401 0 0 1 2 28.604V7.396A5.401 5.401 0 0 1 7.396 2h21.21a1 1 0 0 1 0 2H7.395a3.4 3.4 0 0 0-3.395 3.396v21.208A3.4 3.4 0 0 0 7.396 32h21.21A3.4 3.4 0 0 0 32 28.604V7.396a1 1 0 1 1 2 0v21.208A5.401 5.401 0 0 1 28.606 34zm-.226-19.888H7.62a1 1 0 0 1 0-2h20.76a1 1 0 0 1 0 2zm0 4.955H7.62a1 1 0 0 1 0-2h20.76a1 1 0 0 1 0 2zm-8.303 4.956H7.62a1 1 0 0 1 0-2h12.455a1 1 0 0 1 0 2zm0 4.954H7.62a1 1 0 0 1 0-2h12.455a1 1 0 0 1 0 2z'
      />
    </svg>
  )
}
