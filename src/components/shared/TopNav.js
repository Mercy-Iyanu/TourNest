import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function TopNav() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authUser");
        navigate("/login");
        window.location.reload(); // Ensure state update
    };
  return (
    <div className='flex justify-betweentop-navbar bg-gray-800 text-white p-4 fixed top-0 w-full flex justify-between'>
        <Link href="/">Logo</Link>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">
            Logout
        </button>
    </div>
  )
}

export default TopNav