import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsForProfile } from '../store/eventsSlice.js';
import { toUserTZ } from '../utils/time.js';

export default function EventList({ profile }) {
  const dispatch = useDispatch();
  const events = useSelector(s => s.events.items);

  useEffect(() => { if (profile) dispatch(fetchEventsForProfile(profile._id)); }, [dispatch, profile]);

  if (!profile) return <div>Select a profile to view events</div>;

  return (
    <div>
      <h3>Events for {profile.name} (tz: {profile.timezone})</h3>
      <ul>
        {events.map(ev => (
          <li key={ev._id} style={{ marginBottom: 8 }}>
            <strong>{ev.title}</strong>
            <div>{ev.description}</div>
            <div>Start: {toUserTZ(ev.start, profile.timezone)}</div>
            <div>End: {toUserTZ(ev.end, profile.timezone)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
