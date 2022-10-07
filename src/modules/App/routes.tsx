import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import App from '.'
import { About } from '../About'
import { Home } from '../Home'
import { Login } from '../Login'
import { ProtectedRoute } from '../Auth/ProtectedRoute'
import { Dashboard } from '../Dashboard'
import { Register } from '../Login/Register'
import { Profile } from '../Profile'
import { SinglePost } from '../Posts/SinglePost'
import { Posts } from '../Posts'
import { EditSinglePost } from '../Posts/EditSinglePost'

export const ROUTES = {
  ABOUT: 'about',
  DASHBOARD: 'dashboard',
  LOGIN: 'login',
  POSTS: 'posts',
  REGISTER: 'register',
  PROFILE: 'profile',
}

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.ABOUT} element={<About />} />
      <Route path={ROUTES.POSTS} element={<Outlet />}>
        <Route index element={<Posts />} />
        <Route path=":postId" element={<SinglePost />} />
        <Route path=":postId/edit" element={<EditSinglePost />} />
      </Route>
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <main style={{ padding: '1rem' }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Route>
  </Routes>
)
