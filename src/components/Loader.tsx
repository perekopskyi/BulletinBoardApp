import React from 'react'
import { Spin } from 'antd'

export const Loader = () => {
  return (
    <div className="flex justify-center items-center my-16">
      <Spin tip="Loading" />
    </div>
  )
}
