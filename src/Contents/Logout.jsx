import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Loading from "./../assets/load.gif";

function Logout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.replace("/login");
    }, 1000); //delay para sa loading screen
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 relative">
      <nav className="bg-indigo-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-semibold">MyApp</div>
          <div className="space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="hover:text-gray-200 transition duration-300"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Logout</h1>
          <p className="text-gray-600 mb-6">
            You have been logged out.{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-300"
            >
              Login again
            </Link>
            .
          </p>
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
      </footer>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />

      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-70 z-50">
          <div className="flex flex-col items-center">
            <img
              src={Loading}
              alt="Loading spinner"
              className="w-16 h-16 mb-4"
            />
            <p className="text-lg font-semibold text-gray-700">
              Logging out...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Logout;
