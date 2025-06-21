import React from 'react'
import Header from '../components/Dashboard/Header'
import OverviewSection from '../components/Dashboard/OverviewSection'
import StreakSection from '../components/Dashboard/StreakSection'
import ChartsSection from '../components/Dashboard/ChartsSection'
import SummarySection from '../components/Dashboard/SummarySection'

export default function Dashboard() {
  return (
    <div className='mt-12'>
      
      <Header />
      <OverviewSection />
      <StreakSection />
      <ChartsSection />
      <SummarySection />
    </div>
  )
}
