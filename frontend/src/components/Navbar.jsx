import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    'Dashboard',
    'Track',
    'Groups',
    'Challenges',
    'LeaderBoard',
  ];

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#2E7D32] shadow-md px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo (Left Side) */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-2xl font-bold flex items-center text-white">
              <span className="text-[#CDDC39]">Green</span>Stride
            </Link>
          </div>

          {/* Centered Links */}
          <div className="hidden md:flex space-x-6 items-center justify-center flex-grow">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`/${link.toLowerCase()}`}
                className="text-white hover:text-[#4FC3F7] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Profile Icon and Coins (Right Side) */}
          <div className="hidden md:flex items-center space-x-4 relative">
            {/* Coins */}
            <a
              className="inline-block px-4 py-2 text-white bg-[#4FC3F7] rounded-full 
             hover:bg-transparent hover:text-[#4FC3F7] border border-[#4FC3F7] 
             transition-all duration-300 ease-in-out font-medium text-sm"
            >
              119 GreenPoints
            </a>

            {/* Profile Icon */}
            <button
              className="text-white hover:text-[#4FC3F7] transition-colors relative"
              onClick={() => setProfileModalOpen(!isProfileModalOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            {/* Profile Modal */}
            {isProfileModalOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-56 z-50 border border-gray-200">
                <div className="space-y-2">
                  {/* View Profile Button */}
                  <button
                    className="w-full flex items-center space-x-2 text-[#2E7D32] hover:bg-gray-100 transition-colors py-2 px-3 rounded"
                    onClick={() => {
                      setProfileModalOpen(false);
                      navigate('/profile'); // Navigate to /profile
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#4FC3F7]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>View Profile</span>
                  </button>

                  {/* Logout Button */}
                  <button
                    className="w-full flex items-center space-x-2 text-red-500 hover:bg-gray-100 transition-colors py-2 px-3 rounded"
                    onClick={() => {
                      // Step 1: Remove the token from local storage
                      localStorage.removeItem('token'); // Assuming the token is stored under the key 'token'

                      // Step 2: Close the profile modal
                      setProfileModalOpen(false);

                      // Step 3: Navigate to the login page
                      navigate('/login');
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Links */}
        <div
          className={`${isMobileMenuOpen ? 'flex' : 'hidden'
            } md:hidden flex-col mt-4 space-y-2 px-4`}
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={`/${link.toLowerCase()}`}
              className="text-white hover:text-[#4FC3F7] transition-colors py-2 text-center"
            >
              {link}
            </a>
          ))}
          <a
            href="/coins"
            className="text-white hover:text-[#4FC3F7] transition-colors py-2 text-center"
          >
            Coins
          </a>
          <button
            className="text-white hover:text-[#4FC3F7] transition-colors py-2 text-center"
            onClick={() => setProfileModalOpen(true)}
          >
            Profile
          </button>
        </div>
      </nav>
    </>
  );
}