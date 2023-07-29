import React from 'react'
import { Outlet } from 'react-router-dom'

export const AuthRouter: React.FC = () => {
  return (
    <div>
        AuthRouter
        <Outlet />
    </div>
  )
}