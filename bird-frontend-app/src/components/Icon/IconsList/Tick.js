import React from 'react'

export default function Tick (props) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={props.size} height={props.size} {...props}>
      <path fill='#000000' d='M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z' />
    </svg>
  )
}
