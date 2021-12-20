import React from 'react'

export default function Community (props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width={props.size}
      height={props.size}
      viewBox='0 0 36 36'
      {...props}
    >
      <g fill='none' fillRule='evenodd' transform='translate(1 7)'>
        <path
          fill={props.fill || '#4A4A4A'}
          d='M33.991 17.807c-.284-2.069-1.753-5.699-5.312-6.307.63-1.74 1.002-3.714 1.002-5.426 0-3.86-2.059-6.074-5.65-6.074-3.593 0-5.653 2.214-5.653 6.074 0 1.233.197 2.621.57 4.014.142.533.697.85 1.223.708a1 1 0 0 0 .708-1.225c-.324-1.209-.5-2.45-.5-3.497 0-2.78 1.16-4.074 3.651-4.074 2.491 0 3.651 1.294 3.651 4.074 0 1.867-.539 4.19-1.374 5.918a.997.997 0 0 0 .073.995.991.991 0 0 0 .895.437c3.206-.21 4.3 2.795 4.618 4.088-1.189.694-3.784 1.345-7.357 1.345-1.057 0-2.065-.07-3.028-.187-.65-1.41-1.673-2.815-3.17-3.696.547-.707 1.22-1.169 2.013-1.374 1.054 1.842 2.316 2.81 3.68 2.81.746 0 1.47-.293 2.15-.872a1 1 0 0 0-1.297-1.523c-.308.262-.595.395-.854.395-.663 0-1.519-.902-2.234-2.355a.993.993 0 0 0-.985-.554c-1.836.16-3.342 1.101-4.399 2.73-.166-.035-.329-.075-.503-.098.805-2.134 1.284-4.587 1.284-6.702 0-4.586-2.346-7.11-6.604-7.11-4.259 0-6.605 2.524-6.605 7.11 0 1.473.236 3.126.68 4.783a1 1 0 0 0 1.931-.519c-.394-1.468-.61-2.983-.61-4.264 0-3.439 1.505-5.11 4.604-5.11 3.098 0 4.604 1.671 4.604 5.11 0 2.274-.658 5.107-1.678 7.217a.996.996 0 0 0 .073.995c.2.296.548.461.895.438 4.158-.27 5.46 3.712 5.81 5.224-1.41.882-4.632 1.73-9.096 1.73-4.472 0-7.698-.85-9.104-1.734.283-1.287 1.26-4.394 4.17-5.039 1.243 2.238 2.73 3.415 4.326 3.415.85 0 1.677-.337 2.458-1.002a1 1 0 0 0-1.297-1.522c-.408.348-.799.524-1.16.524-.892 0-1.966-1.103-2.875-2.95a.994.994 0 0 0-.985-.556C2.095 14.575.305 19.21.008 21.604c-.04.322.08.644.32.863 1.713 1.56 5.98 2.567 10.87 2.567 4.887 0 9.152-1.008 10.866-2.567.244-.222.363-.549.32-.875a9.342 9.342 0 0 0-.16-.836c.75.061 1.52.101 2.312.101 4.16 0 7.66-.833 9.137-2.174.243-.222.362-.549.318-.876'
        />
      </g>
    </svg>
  )
}
