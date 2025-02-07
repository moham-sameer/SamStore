import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
// Set the base URL for Axios requests
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Your backend URL
});


  
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
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  user: null,  // Ensure user starts as null, not undefined
  error: null,
},

  
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload; // Set the user from the decoded token
      },
      setToken: (state, action) => {
        state.token = action.payload; // Store the token in the state
      },
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
        
        const decodedUser = jwtDecode(action.payload.token);
        state.user = decodedUser.user;  // Make sure this part is correctly updating state.user
        
        localStorage.setItem('token', action.payload.token);
      })     
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the logout action
export const { setUser,setToken, logout,clearError } = authSlice.actions;

export default authSlice.reducer;
