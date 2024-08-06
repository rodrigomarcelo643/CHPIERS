import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Modal from "react-modal";
import { auth, createUserWithEmailAndPassword } from "./firebase";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Settings from "./Settings";
import Logout from "./Logout";
import Loading from "../assets/load.gif";

Modal.setAppElement("#root");

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(""); // Clear previous errors

    // Check if email or password is empty
    if (!email || !password) {
      setError("Please fill in both fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Attempt to create a user with the given email and password
      await createUserWithEmailAndPassword(auth, email, password);

      // Registration successful
      setModalMessage("User registered successfully!");
      setModalIsOpen(true);

      // Close the modal after 2 seconds and reset inputs
      setTimeout(() => {
        setModalIsOpen(false);
        setModalMessage("");
        setEmail(""); // Clear email input
        setPassword(""); // Clear password input
      }, 2000);
    } catch (err) {
      // Registration failed
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <span className="text-xl font-bold">Register</span>
        </div>

        {/* Display error message if any */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 text-white font-semibold rounded-md shadow-md ${
              isSubmitting ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <img src={Loading} alt="Loading..." className="w-6 h-6" />
              </div>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-800">
            Login
          </Link>
        </p>
      </div>

      {/* Modal for displaying messages */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Registration Status"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2 className="text-lg font-bold">{modalMessage}</h2>
      </Modal>
    </div>
  );
}

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />

        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
