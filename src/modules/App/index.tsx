import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { AuthProvider } from '../Auth/AuthProvider'
import { Navbar } from './Navbar'

import { gapi } from 'gapi-script'
import { getConfig } from '../../config'

const { Header, Footer, Content } = Layout

const App = () => {
  const { clientId } = getConfig()
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId,
        scope: ['https://www.googleapis.com/auth/drive.metadata.readonly'],
      })
    }

    gapi.load('client:auth2', start)
  })

  return (
    <AuthProvider>
      <Layout id="App" style={{ minHeight: '100vh' }}>
        <Header className="flex justify-between">
          <Link to="/">
            <h3 className="font-bold text-white">Bulletin Board</h3>
          </Link>
          <Navbar />
        </Header>
        <Content className="h-full w-full px-12 py-6">
          <Outlet />
        </Content>
        <Footer>(c) {new Date().getFullYear()}</Footer>
      </Layout>
    </AuthProvider>
  )
}

export default App
