import React from 'react'

export default function UploadCustom ({ size, color = '#3831FF', grad, ...props }) {
  return (
    <svg viewBox='0 0 20 21' width={size} height={size} {...props} xmlns='http://www.w3.org/2000/svg'>
      <path
        opacity='1' fill={color} fillRule='evenodd'
        d='M4.167 13.639c0-.478.372-.857.84-.857.468 0 .84.38.84.857v2.315h8.32v-2.301c0-.478.372-.857.826-.87.468 0 .84.378.84.856v3.172a.843.843 0 0 1-.84.856H5.007a.843.843 0 0 1-.84-.856zm2.231-3.2c0-.225.083-.435.248-.604a.82.82 0 0 1 1.185 0l1.336 1.361V5.19c0-.477.372-.856.84-.856.468 0 .84.38.84.856v6.007l1.336-1.36a.82.82 0 0 1 1.185 0c.33.336.33.87 0 1.206l-2.769 2.821a.82.82 0 0 1-1.184 0l-2.769-2.82a.847.847 0 0 1-.248-.604z'
      />
    </svg>
  )
}
