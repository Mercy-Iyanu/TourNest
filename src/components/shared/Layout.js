import React from 'react'
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="layout">
        <TopNav />
        <main className="content">
            <Outlet />
        </main>
        <BottomNav />
    </div>
  )
}

export default Layout;