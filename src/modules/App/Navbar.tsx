import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd'
import { useAuth } from '../../shared/useAuth'
import { ROUTES } from './routes'

const UserNavbar = ({ dashboardLink, onLogout }: any) => (
  <>
    {dashboardLink && (
      <NavLink to={ROUTES.DASHBOARD} className="mx-2">
        Dashboard
      </NavLink>
    )}
    <NavLink className="mx-2" to={ROUTES.ABOUT}>
      About
    </NavLink>
    <NavLink className="mx-2" to={ROUTES.POSTS}>
      Posts
    </NavLink>
    <NavLink className="mx-2" to={ROUTES.PROFILE}>
      Profile
    </NavLink>
    <Button className="mx-2" type="primary" onClick={onLogout}>
      Logout
    </Button>
  </>
)

export const Navbar = () => {
  const { loggedIn, token, onLogout }: any = useAuth()

  return (
    <nav className="text-white">
      {token ? (
        <UserNavbar
          {...{ dashboardLink: loggedIn?.user?.username === 'admin', onLogout }}
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
