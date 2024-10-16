import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
// Set the base URL for Axios requests
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Your backend URL
});

export const setUserFromToken = (token) => (dispatch) => {
    try {
      const decoded = jwt_decode(token);
      dispatch(setUser(decoded)); // Assuming setUser updates the state with user info
    } catch (error) {
      console.error("Invalid token", error);
      dispatch(logout()); // Log out if token is invalid
    }
  };
// Async thunk for signup
export const signup = createAsyncThunk('auth/signup', async (userData, thunkAPI) => {
  try {
    const response = await axiosInstance.post('/api/auth/signup', userData);
    localStorage.setItem('token', response.data.token); // Save token to localStorage
    return response.data; // Token and user data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk for login
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', userData);
    localStorage.setItem('token', response.data.token); // Save token to localStorage
    return response.data; // Token and user data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    clearError: (state) => {
        state.error = null; // Clear error
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the logout action
export const { setUser, logout,clearError } = authSlice.actions;

export default authSlice.reducer;
