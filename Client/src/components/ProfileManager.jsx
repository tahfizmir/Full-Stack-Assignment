import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles, createProfile } from '../store/profilesSlice.js';

export default function ProfileManager({ onSelect }) {
  const dispatch = useDispatch();
  const profiles = useSelector(s => s.profiles.items) || [];
  const [name, setName] = useState('');
  const [tz, setTz] = useState('UTC');

  useEffect(() => { dispatch(fetchProfiles()); }, [dispatch]);

  const add = async () => {
    if (!name) return;
    await dispatch(createProfile({ name, timezone: tz }));
    setName('');
  };

  return (
    <>
      <div style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12 }}>
      <h3>Profiles</h3>
      <div>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <select value={tz} onChange={e => setTz(e.target.value)}>
          <option>UTC</option>
          <option>America/New_York</option>
          <option>Europe/London</option>
          <option>Asia/Kolkata</option>
          <option>Asia/Dhaka</option>
        </select>
        <button onClick={add}>Create</button>
      </div>

      <ul>
        {profiles.length === 0 && <li>No profiles yet</li>}
        {profiles.map(p => (
          <li key={p._id}>
            <button onClick={() => onSelect(p)}>{p.name} ({p.timezone})</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
