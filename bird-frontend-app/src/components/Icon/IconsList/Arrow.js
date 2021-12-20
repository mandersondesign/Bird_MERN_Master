import React from 'react'

export default function Arrow (props) {
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
        d='M31.352 17.18a.996.996 0 0 0 .063-.313c0-.041-.019-.076-.023-.115l.194.198-.234.23zm2.361-.92L22.942 5.3A1 1 0 0 0 21.515 6.7l9.033 9.192c-.046-.006-.086-.026-.133-.026H3a1 1 0 1 0 0 2h27.415c.106 0 .203-.03.299-.061l-9.376 9.213a.999.999 0 1 0 1.402 1.426l10.961-10.77a1.002 1.002 0 0 0 .012-1.414z'
      />
    </svg>
  )
}
