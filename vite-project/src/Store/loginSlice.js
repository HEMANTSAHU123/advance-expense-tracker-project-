
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      const user = userCredential.user;
      
      return {
        uid: user.uid,
        email: user.email,
       
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

 export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    isLoggedIn: false,
  },
  reducers: {
    resetLoginState: (state) => {
      state.isLoading = false;
      state.error = null;
    
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; 
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
        state.isLoggedIn = false;
      });
  },
});

export const { resetLoginState } = loginSlice.actions;