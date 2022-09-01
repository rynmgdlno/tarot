import React from 'react'

const Dots = ({ className, fill }) => {
  return (
    <svg height={24} width={24} className={className}>
      <path d="M0 0h24v24H0V0z" fill='none' />
      <path fill={fill} d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  )
}

export default Dots