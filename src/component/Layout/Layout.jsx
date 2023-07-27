import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
export default function Layout({userData,logOut}) {
  return (
    <>
    <Navbar data={userData} logOut={logOut}  />
    <div className='continer w-75 m-auto'>
    <Outlet/>
    </div>
  
    <Footer/>
    </>
  )
}
