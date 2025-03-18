import React from "react";
import { Link } from "react-router-dom";

function BottomNav() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-gray-300 text-sm p-3 flex justify-between items-center md:px-10 shadow-md">
      <span className="text-gray-400">&copy; {new Date().getFullYear()} GetThere</span>

      <nav className="flex gap-6">
        <Link to="/" className="hover:text-white transition">Home</Link>
        <Link to="/inventory" className="hover:text-white transition">Tour Inventory</Link>
        <Link to="/distributors" className="hover:text-white transition">My Distributors</Link>
      </nav>
    </footer>
  );
}

export default BottomNav;
