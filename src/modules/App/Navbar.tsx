import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd'
import { useAuth } from '../../shared/useAuth'
import { ROUTES } from './routes'

const UserNavbar = ({ dashboardLink }: any) => {
  const {
    loggedIn: { user },
    onLogout,
  }: any = useAuth()

  const name =
    user?.firstName && user?.lastName
      ? `${user?.firstName} ${user?.lastName}`
      : user?.username

  return (
    <>
      <span style={{ marginRight: 30 }}>Hi! {name}</span>

      {dashboardLink && (
        <NavLink to={ROUTES.DASHBOARD} className="mx-2">
          Dashboard
        </NavLink>
      )}
      <NavLink className="mx-2" to={ROUTES.ABOUT}>
        About
      </NavLink>
      <NavLink className="mx-2" to={ROUTES.POSTS}>
        Your Posts
      </NavLink>
      <NavLink className="mx-2" to={ROUTES.PROFILE}>
        Profile
      </NavLink>
      <Button className="mx-2" type="primary" onClick={onLogout}>
        Logout
      </Button>
    </>
  )
}

export const Navbar = () => {
  const { loggedIn }: any = useAuth()

  return (
    <nav className="text-white">
      {loggedIn ? (
        <UserNavbar
          {...{ dashboardLink: loggedIn?.user?.username === 'admin' }}
        />
      ) : (
        <>
          <NavLink className="mx-2" to={ROUTES.ABOUT}>
            About
          </NavLink>
          <Button className="mx-2" type="primary">
            <NavLink to={ROUTES.LOGIN} className="mx-2">
              Login
            </NavLink>
          </Button>
          <Button className="mx-2" type="primary">
            <NavLink to={ROUTES.REGISTER} className="mx-2">
              Sign up
            </NavLink>
          </Button>
        </>
      )}
    </nav>
  )
}
