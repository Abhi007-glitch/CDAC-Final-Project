import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
const Layout = () => {
  return (
    <>
     <Header/>
    <div >
       
      {/* the below Outlet component represts all the childrens(anything nested inside the layout) of the Layout */}
      <Outlet />   
    </div>
    </>
  )
}

export default Layout