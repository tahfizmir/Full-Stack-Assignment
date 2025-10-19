import { useState } from 'react'
import './App.css'
import ProfileManager from './components/ProfileManager.jsx'
import EventForm from './components/EventForm.jsx'
import EventList from './components/EventList.jsx'

function App() {
  const [selectedProfile, setSelectedProfile] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>Event Management (Demo)</h1>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ width: 320 }}>
          <ProfileManager onSelect={setSelectedProfile} />
          <EventForm profile={selectedProfile} />
        </div>
        <div style={{ flex: 1 }}>
          <EventList profile={selectedProfile} />
        </div>
      </div>
    </div>
  )
}

export default App
