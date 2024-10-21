import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'


export const Layout = () => {
  return (
    <>
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-gray-100 overflow-hidden pt-20">
            <NavBar />
            <Outlet/>
        </div>
    </>
  )
}
