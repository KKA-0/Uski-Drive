import React from 'react'
import "./Navbar.style.scss"

const Navbar = () => {
  const handleLogout = () => {
    // Delete the 'token' cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    console.log('User logged out');
    // Optionally redirect the user
    window.location.href = '/'; // Redirect to login page or any other page
  };
  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/">Uski Drive</a>
        </div>
        <button className="navbar-logout" onClick={handleLogout}>Logout</button>
      </nav>
    </>
  )
}

export default Navbar