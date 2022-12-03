import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getStats = createAsyncThunk(
  "user/getStats",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/users/stats",
        {
          headers: {
            token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllusers",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/users/getUsers",
        {
          headers: {
            token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    error: null,
    currentUser: null,
    users: [],
    userStats: [],
  },
  reducers: {
    loginStart(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      const user = action.payload;
      state.isLoading = false;
      state.currentUser = user;
      state.token = user.token;
      !user.isAdmin && (state.error = "You're not authorized");
    },
    loginFailure(state, action) {
      const error = action?.payload?.response?.data || action.payload?.message;
      state.isLoading = false;
      state.error = error;
    },
    logout: (state) => {
      state.currentUser = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStats.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userStats = action.payload;
      })
      .addCase(getStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
