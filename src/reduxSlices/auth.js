import Authenticator from '../utils/authenticator';
import * as api from './../services/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: Authenticator.isAuthenticated(),
  user: Authenticator.getUser(),
};

export const signIn = createAsyncThunk('users/signIn', async (formData, thunkHelper) => {
  const { data } = await api.signIn(formData);
  return data;
});

export const signUp = createAsyncThunk('user/signUp', async (formData, thunkHelper) => {
  const { data } = await api.signUp(formData);
  return data;
});

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.clear();
      return { isAuthenticated: false, user: null };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        Authenticator.login(action.payload);
        const isAuthenticated = Authenticator.isAuthenticated();
        const user = Authenticator.getUser();
        return { ...state, isAuthenticated, user };
      })
      .addCase(signUp.fulfilled, (state, action) => {
        Authenticator.login(action.payload);
        const isAuthenticated = Authenticator.isAuthenticated();
        const user = Authenticator.getUser();
        return { ...state, isAuthenticated, user };
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
