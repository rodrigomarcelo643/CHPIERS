import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaTachometerAlt,
} from "react-icons/fa";
import "./../Css/App.css"; // Ensure your CSS file includes spinner styles
import Modal from "./Modal"; // Import the Modal component
import Loading from "./../assets/load.gif";

function Settings() {
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate data fetching delay

    return () => clearTimeout(timer);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // Handle the logout logic here
    window.location.replace("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full text-black transition-transform duration-300 ${
          isSidebarOpen ? "w-64 " : "w-20 "
        } ${
          isSidebarOpen
            ? "translate-x-0 bg-gradient-to-br from-green-400 via-green-600 to-green-800"
            : "-translate-x-full bg-gradient-to-br "
        } md:translate-x-0 md:w-64`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-black hover:text-gray-600"
            >
              {isSidebarOpen ? (
                <FaTimes size={24} className="text-black" />
              ) : (
                <FaBars size={24} className="text-black" />
              )}
            </button>
          </div>
          <ul className="space-y-4">
            <li className="flex items-center">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 ${
                  isSidebarOpen ? "ml-2" : "justify-center"
                } ${
                  isActive("/dashboard") ? "bg-white text-green-600" : ""
                } p-2 rounded-md`}
              >
                <FaTachometerAlt size={24} className="text-black" />
                {isSidebarOpen && <span>Dashboard</span>}
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                to="/profile"
                className={`flex items-center space-x-2 ${
                  isSidebarOpen ? "ml-2" : "justify-center"
                } ${
                  isActive("/profile") ? "bg-white text-green-600" : ""
                } p-2 rounded-md`}
              >
                <FaUser size={24} className="text-black" />
                {isSidebarOpen && <span>Profile</span>}
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                to="/settings"
                className={`flex items-center space-x-2 ${
                  isSidebarOpen ? "ml-2" : "justify-center"
                } ${
                  isActive("/settings") ? "bg-white text-green-600" : ""
                } p-2 rounded-md`}
              >
                <FaCog size={24} className="text-black" />
                {isSidebarOpen && <span>Settings</span>}
              </Link>
            </li>
            <li className="flex items-center">
              <button
                onClick={() => setIsModalOpen(true)} // Open modal on click
                className={`flex items-center space-x-2 ${
                  isSidebarOpen ? "ml-2" : "justify-center"
                } ${
                  isActive("/logout") ? "bg-white text-green-600" : ""
                } p-2 rounded-md`}
              >
                <FaSignOutAlt size={24} className="text-black" />
                {isSidebarOpen && <span>Logout</span>}
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-grow flex flex-col ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        } transition-all duration-300`}
      >
        {/* Navigation Bar */}
        <nav className="bg-green-600 text-white shadow-md sticky top-0 z-10">
          <div className="container mx-auto px-4 py-3 flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white hover:text-gray-200 md:hidden absolute left-4"
            >
              {isSidebarOpen ? (
                <FaTimes size={24} className="text-white" />
              ) : (
                <FaBars size={24} className="text-white" />
              )}
            </button>
            <span className="text-white text-xl font-semibold ml-12">
              CHPIERS
            </span>
          </div>
        </nav>

        {/* Main Content */}
        {loading ? (
          <main className="flex-grow flex items-center justify-center">
            <div className="w-full text-center">
              <div className="spinner1">
                <img src={Loading} />
              </div>
              {/* Ensure spinner styles are defined in your CSS */}
            </div>
          </main>
        ) : (
          <main className="flex-grow p-6">
            <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                  <FaCog className="text-6xl text-gray-500" />
                </div>
              </div>
              <h1 className="text-2xl font-bold mb-4 text-center">
                Settings Page
              </h1>
              <p className="text-gray-600 mb-6 text-center">
                Customize your application settings here.
              </p>
              <Link
                to="/dashboard"
                className="block bg-gray-300 text-gray-800 text-center py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                Go to Dashboard
              </Link>
            </div>
          </main>
        )}

        {/* Footer */}
        <footer className="bg-black text-white text-center py-4">
          <p>&copy; {new Date().getFullYear()} CHPIERS</p>
        </footer>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}

export default Settings;
