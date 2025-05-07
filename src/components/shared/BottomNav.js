import React from "react";
import { Link } from "react-router-dom";

function BottomNav() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-gray-300 text-sm p-3 flex justify-between items-center md:px-10 shadow-md">
      <span className="text-gray-400">&copy; {new Date().getFullYear()} GetThere</span>
    </footer>
  );
}

export default BottomNav;