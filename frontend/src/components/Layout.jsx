import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='bg-white h-screen'>
      <Sidebar />
      <div className='ml-12 md:ml-50 bg-white min-h-screen'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout