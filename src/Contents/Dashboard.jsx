import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaTachometerAlt,
} from "react-icons/fa";
import Modal from "./Modal";
import Loading from "./../assets/load.gif";
import AddPatient from "./../assets/add_patient.jpg";
import PatientStatus from "./../assets/patient_status.jpg";
import DoctorApproval from "./../assets/doctor_approval.jpg";
import PatientSupport from "./../assets/patient_support.jpg";
import Nurse from "./../assets/nurse.jpg";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./../Css/App.css";

function Dashboard() {
  const [showContent, setShowContent] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || "User");
        setShowContent(true);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Error signing out: ", error);
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newPatientRef = ref(database, "patients").push();
      await set(newPatientRef, formData);
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        medicalHistory: "",
        symptoms: "",
      });
      alert("Patient added successfully!");
    } catch (error) {
      console.error("Error adding patient: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full text-black transition-transform duration-300 sidebar ${
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
                  isActive("/dashboard")
                    ? "bg-green-500 text-white font-bold shadow-md tracking-wide"
                    : ""
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
                  isActive("/profile") ? "bg-green-600 text-white-600" : ""
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
                  isActive("/settings") ? "bg-green-600 text-white-600" : ""
                } p-2 rounded-md`}
              >
                <FaCog size={24} className="text-black" />
                {isSidebarOpen && <span>Settings</span>}
              </Link>
            </li>
            <li className="flex items-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className={`flex items-center space-x-2 ${
                  isSidebarOpen ? "ml-2" : "justify-center"
                } ${
                  isActive("/logout") ? "bg-green-600 text-white-600" : ""
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
        {!showContent ? (
          <main className="flex-grow flex items-center justify-center">
            <div className="w-full text-center">
              <div className="spinner1">
                <img src={Loading} alt="Loading" className="w-16 h-16" />
              </div>
            </div>
          </main>
        ) : (
          <main className="flex-grow overflow-y-auto py-6 px-4">
            <div className="w-full max-w-4xl mx-auto">
              {/* Container for image and content */}
              {showContent === "addPatient" ? (
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h2 className="text-2xl font-semibold mb-4">
                    Add New Patient
                  </h2>
                  {/* Replace with the actual form or content for adding a patient */}
                  <p>Form or content for adding a patient goes here.</p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col md:flex-row">
                    {/* Nurse IMAGE */}
                    <div className="whole-nurse md:w-1/3 bg-white rounded-l-lg overflow-hidden md:rounded-r-lg md:rounded-l-none mb-6 md:mb-0 p-6">
                      <img
                        src={Nurse}
                        alt="Nurse"
                        className="w-full h-auto rounded-lg mb-4 nurseImage"
                      />
                      <h2 className="text-2sm font-bold mb-4 text-gray-800">
                        Welcome to Our Nursing Team {userEmail} !
                      </h2>
                      <p className="text-gray-700 mb-4">
                        We are thrilled to have you as part of our dedicated
                        nursing team. Your commitment and expertise play a
                        crucial role in providing exceptional care to our
                        patients.
                      </p>
                      <p className="text-gray-700 mb-4">
                        As a valued member of our team, you will find a
                        supportive environment where you can thrive
                        professionally and make a meaningful impact. We believe
                        in continuous learning and collaboration to ensure the
                        highest standards of patient care.
                      </p>
                      <p className="text-gray-700">
                        Welcome aboard, and we look forward to working together
                        to make a difference in the lives of those we serve.
                      </p>
                    </div>

                    {/* Content section */}
                    <div className="w-full md:w-2/3 p-6">
                      {/* Section 1 */}
                      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
                        <div
                          className="relative"
                          style={{ paddingBottom: "56.25%" }}
                        >
                          <iframe
                            width="853"
                            height="480"
                            className="absolute inset-0 w-full h-full rounded-lg"
                            src="https://www.youtube.com/embed/WzQ2HVrrGQk"
                            title="WHO: Nurses and midwives: key to universal health coverage"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
                        <div className="relative pb-[56.25%]">
                          <iframe
                            width="853"
                            height="480"
                            className="absolute inset-0 w-full h-full rounded-lg"
                            src="https://www.youtube.com/embed/JF-94zLg2QQ"
                            title="Advanced Critical Care Nursing: General Assessment"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
                        <div className="relative pb-[56.25%]">
                          <iframe
                            width="853"
                            height="480"
                            className="absolute inset-0 w-full h-full rounded-lg"
                            src="https://www.youtube.com/embed/ZfWfAgnbNk0"
                            title="I AM A NURSE"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ADDING OR VIEWING RECORDS BOXES PATIENT  */}
                  <div className="flex flex-wrap gap-4 main-box">
                    <div
                      onClick={() => setShowContent("addPatient")}
                      className="bg-white rounded-lg shadow-lg p-6 flex-1 min-w-[250px] text-center h-48 flex flex-col justify-center group hover:shadow-xl transition-shadow duration-300 ease-in-out boxes box cursor-pointer"
                    >
                      <h3 className="text-xl font-semibold mb-2">
                        Add New Patient
                      </h3>
                      <div className="flex justify-center mb-2">
                        <img
                          src={AddPatient}
                          style={{ width: "80px", height: "60px" }}
                          alt="Add Patient"
                        />
                      </div>
                      <p className="text-green-600">
                        Click here to add new patients to the system.
                      </p>
                    </div>

                    <Link
                      to="/patient-status"
                      className="bg-white rounded-lg shadow-lg p-6 flex-1 min-w-[250px] text-center h-48 flex flex-col justify-center group hover:shadow-xl transition-shadow duration-300 ease-in-out boxes box"
                    >
                      <h3 className="text-xl font-semibold mb-2">
                        Patient Status
                      </h3>
                      <div className="flex justify-center mb-2">
                        <img
                          src={PatientStatus}
                          style={{ width: "80px", height: "60px" }}
                          alt="Patient Status"
                        />
                      </div>
                      <p className="text-green-600">
                        View and update the status of existing patients.
                      </p>
                    </Link>

                    <Link
                      to="/doctor-approval"
                      className="bg-white rounded-lg shadow-lg p-6 flex-1 min-w-[250px] text-center h-48 flex flex-col justify-center group hover:shadow-xl transition-shadow duration-300 ease-in-out boxes box"
                    >
                      <h3 className="text-xl font-semibold mb-2">
                        Send Doctor Approvals
                      </h3>
                      <div className="flex justify-center mb-2">
                        <img
                          src={DoctorApproval}
                          style={{ width: "70px", height: "60px" }}
                          alt="Doctor Approvals"
                        />
                      </div>
                      <p className="text-green-600">
                        Manage doctor approvals and related notifications.
                      </p>
                    </Link>

                    <Link
                      to="/record-anomalies"
                      className="bg-white rounded-lg shadow-lg p-6 flex-1 min-w-[250px] text-center h-48 flex flex-col justify-center group hover:shadow-xl transition-shadow duration-300 ease-in-out boxes box"
                    >
                      <h3 className="text-xl font-semibold mb-2">
                        Record Anomalies
                      </h3>
                      <div className="flex justify-center mb-2">
                        <img
                          src={PatientSupport}
                          style={{ width: "70px", height: "60px" }}
                          alt="Record Anomalies"
                        />
                      </div>
                      <p className="text-green-600">
                        Record and review any anomalies found in patient data.
                      </p>
                    </Link>
                  </div>
                </>
              )}
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
      {/* Loading Spinner */}
      {isLoading && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center z-50">
          <img src={Loading} alt="Loading" className="w-16 h-16" />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
