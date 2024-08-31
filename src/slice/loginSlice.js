import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  isLoading: false,
};

export const login = createAsyncThunk("auth/login", async (requestedData) => {
  const res = await axios.post(`user/login`, requestedData);
  const data = await res.data;
  return data;
});

export const signup = createAsyncThunk("auth/signup", async (requestedData) => {
  const res = await axios.post(`user/signup`, requestedData);
  const data = await res.data;
  return data;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const res = await axios.get(`user/logout`);
  const data = await res.data;
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = null;
      localStorage.removeItem("persist:root");
      localStorage.removeItem("token");
    });
  },
});

export default userSlice.reducer;
