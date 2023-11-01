import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Common/Footer'
import Header from '../Common/Header'

const BaseLayout = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh)]">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default BaseLayout