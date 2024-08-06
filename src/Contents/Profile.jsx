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
import { auth } from "./firebase"; // Import your Firebase configuration
import { onAuthStateChanged, signOut } from "firebase/auth";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Manage logout state
  const [userEmail, setUserEmail] = useState(""); // State for user email
  const location = useLocation();

  // Fetch user data on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || "User");
      } else {
        setUserEmail("User"); // Default if no user is signed in
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    setIsLoggingOut(true); // Show loading screen
    signOut(auth).then(() => {
      localStorage.removeItem("lastLoggedInEmail"); // Clear the email from storage
      setTimeout(() => {
        window.location.replace("/login"); // Redirect after loading screen
      }, 1000); // Adjust delay to match loading screen duration
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full text-black transition-transform duration-300 ${
          isSidebarOpen ? "w-64 " : "w-20 "
        } ${
          isSidebarOpen
            ? "translate-x-0 bg-gradient-to-br from-green-400 via-green-600 to-green-800"
            : "-translate-x-full gradient-10 from-green-400 via-green-600 to-green-800"
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
                <img src={Loading} alt="Loading" />
              </div>
              {/* Ensure spinner styles are defined in your CSS */}
            </div>
          </main>
        ) : (
          <main className="flex-grow p-6">
            <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                  <FaUser className="text-6xl text-gray-500" />
                </div>
              </div>
              <h1 className="text-2xl font-bold mb-4 text-center">
                Profile Page
              </h1>
              <p className="text-gray-600 mb-6 text-center">
                Welcome to your profile, {userEmail}! Here, you can view and
                manage your personal information.
              </p>
              <Link
                to="/settings"
                className="block bg-gray-300 text-gray-800 text-center py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                Go to Settings
              </Link>
            </div>
          </main>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />

      {/* Loading Screen */}
      {isLoggingOut && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-70 z-50">
          <div className="flex flex-col items-center">
            <img src={Loading} alt="Loading" className="w-16 h-16 mb-4" />
            <p className="text-lg font-semibold text-gray-700">
              Logging out...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
