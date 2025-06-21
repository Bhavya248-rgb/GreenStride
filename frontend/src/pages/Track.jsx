import React from 'react'
import Header from '../components/Track page/Header'
import OverviewSection from '../components/Track page/OverviewSection'
import TrackSections from '../components/Track page/TrackSections'
import Suggestions from '../components/Track page/Suggestions'

export default function Track() {
  return (
    <div className='mt-12'>
      <Header />
      <OverviewSection />
      <TrackSections />
      <Suggestions/>
    </div>
  )
}
