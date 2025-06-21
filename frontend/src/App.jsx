import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Track from './pages/Track'
import Dashboard from './pages/Dashboard';
import NeighborhoodPulseMap from './components/LeaderBoard/NeighborhoodPulseMap';
import Profile from './pages/Profile';
import Groups from './pages/Groups';

function App() {

  return (
    <div className="">
      {/* Navbar is rendered outside Routes */}
    <Navbar />
      {/* Define Routes */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/track" element={<Track />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<NeighborhoodPulseMap />} />
        <Route path="/groups" element={<Groups />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/nav" element={<p className="text-8xl">Nav Page</p>} />
      </Routes>
    </div>
  )
}

export default App
