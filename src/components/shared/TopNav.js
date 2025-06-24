import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";

function TopNav() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("authUser"));
    const storedRole = localStorage.getItem("userRole");

    if (storedUser) {
      setUser(storedUser);
      setUserRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const toggleDropdown = (key) => {
    setDropdownOpen(dropdownOpen === key ? null : key);
  };

  return (
    <nav className="bg-white p-4 top-0 w-full flex items-center justify-between shadow-md z-50">
      <Link to="/" className="text-xl font-semibold flex items-center">
        <img src="/logo.png" alt="GetThere Logo" className="h-12 mr-2" />
      </Link>

      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      <div
        className={`absolute md:static top-16 right-0 bg-gray-800 md:bg-transparent w-full md:w-auto flex flex-col md:flex-row md:items-center p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-6 transition-all duration-300 ${
          menuOpen ? "block" : "hidden md:flex"
        }`}
      >
        {userRole === "tour-owner" && (
          <>
            <Link
              to="/pricing-rule-page"
              className="text-white md:text-gray-800 hover:text-gray-500 transition"
            >
              Pricing Rule
            </Link>
            <div className="relative">
              <button
                onClick={() => toggleDropdown("inventory")}
                className="flex items-center gap-2 text-white md:text-gray-800 hover:text-gray-500 transition"
              >
                Tour Inventory{" "}
                {dropdownOpen === "inventory" ? (
                  <FiChevronDown />
                ) : (
                  <FiChevronRight />
                )}
              </button>
              {dropdownOpen === "inventory" && (
                <div className="absolute mt-2 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden w-48">
                  <Link
                    to="/create-inventory"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Create Inventory
                  </Link>
                  <Link
                    to="/manage-inventory"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Manage Inventory
                  </Link>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("distributors")}
                className="flex items-center gap-2 text-white md:text-gray-800 hover:text-gray-500 transition"
              >
                My Distributors{" "}
                {dropdownOpen === "distributors" ? (
                  <FiChevronDown />
                ) : (
                  <FiChevronRight />
                )}
              </button>
              {dropdownOpen === "distributors" && (
                <div className="absolute mt-2 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden w-48">
                  <Link
                    to="/recent-distributors"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Recent Distributors
                  </Link>
                  <Link
                    to="/distributors-analytics"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Distributors Analytics
                  </Link>
                </div>
              )}
            </div>
          </>
        )}

        {userRole === "tour-distributor" && (
          <>
            <Link
              to="/pricing-rule-form"
              className="text-white md:text-gray-800 hover:text-gray-500 transition"
            >
              Pricing Rule
            </Link>
            <Link
              to="/sales-analytics"
              className="text-white md:text-gray-800 hover:text-gray-500 transition"
            >
              Sales Analytics
            </Link>
          </>
        )}

        {user && (
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.displayName || user.firstName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {userRole?.replace("-", " ")}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
                  {user.firstName?.charAt(0).toUpperCase()}
                </div>
              </div>
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b text-sm">
                  <p className="font-semibold">
                    {user.displayName || user.firstName}
                  </p>
                  <p className="text-xs capitalize text-gray-500">
                    {userRole?.replace("-", " ")}
                  </p>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  <FiLogOut className="text-red-500" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default TopNav;
