import { UserState } from '@/app/[locale]/types/sharedTypes';
import { UserDbObject } from '@/generatedGraphql';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  data: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDbObject>) => {
      state.data = action.payload;
    },
    resetUser: (state) => {
      state.data = null;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
