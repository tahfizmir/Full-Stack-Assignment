import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../store/eventsSlice.js';

export default function EventForm({ profile }) {
  const dispatch = useDispatch();
  const profiles = useSelector(s => s.profiles.items);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedProfiles, setSelectedProfiles] = useState(profile ? [profile._id] : []);
  const [timezone, setTimezone] = useState(profile ? profile.timezone : 'UTC');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const submit = async () => {
    if (!title || !start || !end || new Date(end) <= new Date(start)) {
      alert('Please provide valid title and start/end (end must be after start)');
      return;
    }
    await dispatch(createEvent({ title, description: desc, profiles: selectedProfiles, timezone, start, end }));
    setTitle(''); setDesc(''); setStart(''); setEnd('');
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12 }}>
      <h3>Create Event</h3>
      <div>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
      </div>
      <div>
        <label>Assign profiles</label>
        <select multiple value={selectedProfiles} onChange={e => setSelectedProfiles(Array.from(e.target.selectedOptions, o => o.value))}>
          {profiles.map(p => <option key={p._id} value={p._id}>{p.name} ({p.timezone})</option>)}
        </select>
      </div>
      <div>
        <label>Timezone</label>
        <select value={timezone} onChange={e => setTimezone(e.target.value)}>
          <option>UTC</option>
          <option>America/New_York</option>
          <option>Europe/London</option>
          <option>Asia/Kolkata</option>
          <option>Asia/Dhaka</option>
        </select>
      </div>
      <div>
        <label>Start</label>
        <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} />
      </div>
      <div>
        <label>End</label>
        <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} />
      </div>
      <button onClick={submit}>Create Event</button>
    </div>
  );
}
