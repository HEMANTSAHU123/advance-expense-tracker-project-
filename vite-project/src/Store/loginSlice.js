import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth,db } from '../firebase/firebase'; // Adjust path as needed
import { signInWithEmailAndPassword, sendEmailVerification  } from 'firebase/auth';

const initialState = {
  user: null, 
  isLoading: false,
  error: null,
  isLoggedIn: false, 
};

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const user = userCredential.user;
console.log(user)
      

      // Extract serializable user data
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
  initialState,
  reducers: {
    resetLoginState: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
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
        state.isLoggedIn = true;
        state.user = action.payload; // Store serializable user data
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export const { resetLoginState, logoutUser } = loginSlice.actions;
