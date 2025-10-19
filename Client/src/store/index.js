import { configureStore } from '@reduxjs/toolkit';
import profilesReducer from './profilesSlice.js';
import eventsReducer from './eventsSlice.js';

export const store = configureStore({
  reducer: {
    profiles: profilesReducer,
    events: eventsReducer,
  }
});
