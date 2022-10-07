import React from 'react'
import { Button as AntdButton } from 'antd'

const sizes: any = {
  md: 'px-4 py-2 rounded-md text-base',
  lg: 'px-5 py-3 rounded-lg text-lg',
}

const colors: any = {
  indigo: 'bg-indigo-500 hover:bg-indigo-600 text-white',
  cyan: 'bg-cyan-600 hover:bg-cyan-700 text-white',
}

export default function Button({ color, size, children, ...props }: any) {
  let colorClasses: any = colors[color]
  let sizeClasses: any = sizes[size]

  return (
    <AntdButton
      type="button"
      className={`font-bold ${sizeClasses} ${colorClasses}`}
      style={{ background: '#1890ff !important' }}
      {...props}
    >
      {children}
    </AntdButton>
  )
}
