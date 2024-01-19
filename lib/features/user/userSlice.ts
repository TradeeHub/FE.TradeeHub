// features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    resetUser: (state) => {
      state.data = null; // Explicitly set data to null
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
