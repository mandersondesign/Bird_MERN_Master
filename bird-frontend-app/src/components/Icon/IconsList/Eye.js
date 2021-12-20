import React from 'react'

export default function Eye (props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width={props.size}
      height={props.size}
      viewBox='0 0 36 36'
      {...props}
    >
      <path
        fill={props.fill || '#D7D7D7'}
        fillRule='nonzero'
        d='M.684 13.912a.935.935 0 0 1 0-1.342c.909-.897 2.184-1.921 3.757-2.84 2.4-1.403 4.962-2.227 7.618-2.227 2.655 0 5.217.824 7.617 2.226 1.574.92 2.847 1.941 3.759 2.841a.94.94 0 0 1 0 1.343c-.913.9-2.185 1.922-3.759 2.84-2.4 1.404-4.962 2.228-7.617 2.228-2.656 0-5.218-.824-7.618-2.227-1.573-.92-2.848-1.943-3.757-2.842zm4.514 1.547c2.187 1.278 4.5 2.022 6.86 2.022 2.363 0 4.675-.744 6.862-2.022a18.256 18.256 0 0 0 3.042-2.218 18.255 18.255 0 0 0-3.042-2.217c-2.187-1.277-4.5-2.021-6.861-2.021-2.362 0-4.674.744-6.86 2.021a18.245 18.245 0 0 0-3.043 2.217 18.247 18.247 0 0 0 3.042 2.218zm2.55-5.782a.75.75 0 0 1-.858-.544l-.647-2.415a.75.75 0 1 1 1.449-.389l.647 2.415a.748.748 0 0 1 .021.275 5.736 5.736 0 0 1 2.968-1.442V5.75a.75.75 0 0 1 1.5 0v1.781a5.729 5.729 0 0 1 3.003 1.218l.62-2.312a.75.75 0 0 1 1.449.388l-.647 2.415a.749.749 0 0 1-.443.5 5.706 5.706 0 0 1 1.194 3.501 5.744 5.744 0 0 1-5.75 5.74 5.745 5.745 0 0 1-5.75-5.74c0-1.347.465-2.586 1.244-3.564zm.256 3.564a4.245 4.245 0 0 0 4.25 4.24 4.244 4.244 0 0 0 4.25-4.24 4.244 4.244 0 0 0-4.25-4.238 4.244 4.244 0 0 0-4.25 4.238zm-6.431-3.54A.75.75 0 1 1 2.67 8.68l1.32 1.418a.75.75 0 0 1-1.1 1.021L1.574 9.701zM21.447 8.68A.75.75 0 1 1 22.545 9.7l-1.319 1.418a.75.75 0 0 1-1.098-1.021l1.319-1.418z'
      />
    </svg>
  )
}
