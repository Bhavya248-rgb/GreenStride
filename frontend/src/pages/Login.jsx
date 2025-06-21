import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Context
import { AppContext } from '../context/AppContext';

const Login = () => {
  const [state, setState] = useState('Login'); // Toggle between "Sign Up" and "Login"
  const [username, setUsername] = useState(''); // Changed from 'name' to 'username'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);
  


  // Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Sign Up') {
        // Sign Up logic
        const response = await axios.post(`${backendUrl}/api/auth/register`, {
          username, // Send 'username' instead of 'name'
          email,
          password,
        });
        const data = response.data;

        if (data.success) {
          localStorage.setItem('token', data.accessToken);
          setToken(data.accessToken);
          console.log("SIGN UP TOKEN:",token);
          toast.success('Account created successfully!');
        } else {
          toast.error(data.message || 'Failed to create account.');
        }
      } else {
        // Login logic
        const response = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        });
        console.log(response);
        const data = response.data;
        if (response) {
          localStorage.setItem('token', data.accessToken);
          console.log("DATA:",data);
          
          setToken(data.accessToken);
          console.log("TOKEN:",token);
          toast.success('Logged in successfully!');
        } else {
          toast.error(data.message || 'Failed to log in.');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate('/track');
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-4 p-8 w-full max-w-md border rounded-xl shadow-lg bg-white"
      >
        {/* Header */}
        <h1 className="text-2xl font-bold text-[#2E7D32]">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h1>
        <p className="text-sm text-gray-600">
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to continue.
        </p>

        {/* Username Field (Only for Sign Up) */}
        {state === 'Sign Up' && (
          <div className="w-full">
            <label htmlFor="username" className="block text-sm text-gray-700">
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4FC3F7] focus:border-[#4FC3F7]"
              type="text"
              required
            />
          </div>
        )}

        {/* Email Field */}
        <div className="w-full">
          <label htmlFor="email" className="block text-sm text-gray-700">
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4FC3F7] focus:border-[#4FC3F7]"
            type="email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="w-full">
          <label htmlFor="password" className="block text-sm text-gray-700">
            Password
          </label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4FC3F7] focus:border-[#4FC3F7]"
            type="password"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#2E7D32] text-white w-full py-2 rounded-md text-base hover:bg-[#1B5E20] transition-colors"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {/* Toggle Between Login and Sign Up */}
        <p className="text-sm text-gray-600">
          {state === 'Sign Up'
            ? 'Already have an account? '
            : "Don't have an account? "}
          <span
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
            className="text-[#4FC3F7] underline cursor-pointer hover:text-[#0288D1] transition-colors"
          >
            {state === 'Sign Up' ? 'Login here' : 'Sign Up here'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;