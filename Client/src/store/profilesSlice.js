import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL='http://localhost:4000/'

export const fetchProfiles = createAsyncThunk('profiles/fetch', async () => {
  const res = await axios.get(BASE_URL + 'api/profiles');
  return res.data;
});

export const createProfile = createAsyncThunk('profiles/create', async (payload) => {
  const res = await axios.post(BASE_URL + '/profiles', payload);
  return res.data;
});

const profilesSlice = createSlice({
  name: 'profiles',
  initialState: { items: [], status: 'idle' },
  reducers: {
    setProfiles(state, action) { state.items = action.payload; }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfiles.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(createProfile.fulfilled, (state, action) => { state.items.unshift(action.payload); });
  }
});

export const { setProfiles } = profilesSlice.actions;
export default profilesSlice.reducer;
