import { Layout } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { AppRoutes } from './routes'

const { Header, Footer, Content } = Layout

const App = () => (
  <Layout>
    <Header className="flex justify-between">
      <h3 className="font-bold text-white">Bulletin Board</h3>
      <span className="text-white">
        <Link to="/" className="mr-2">
          Home
        </Link>
        <Link to="/about">About</Link>
      </span>
    </Header>
    <Content>
      <AppRoutes />
    </Content>
    <Footer>(c) 2022</Footer>
  </Layout>
)

export default App
