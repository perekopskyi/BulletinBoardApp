import { Typography } from 'antd'
import React from 'react'
import { useAuth } from '../../shared/useAuth'

export const Dashboard = () => {
  const { loggedIn } = useAuth()

  if (loggedIn?.user.username !== 'admin') {
    return <p>You haven't access to this page</p>
  }

  return (
    <div>
      <Typography.Title level={1}>Dashboard</Typography.Title>
      <p>Coming soon...</p>
    </div>
  )
}
