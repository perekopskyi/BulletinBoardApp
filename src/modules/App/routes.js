import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { About } from '../About'
import { Home } from '../Home'
import { Login } from '../Login'

export const AppRoutes = () => {
  const [token, setToken] = useState()

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
    </Routes>
  )
}
