
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';


export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
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




export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null, 
        isLoadingAuth: false,
        error: null,
        isAuthenticated: false,
    },
    reducers: {
        resetAuthState: (state) => { 
            state.isLoadingAuth = false;
            state.error = null;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload; 
            state.isLoadingAuth = false; 
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        setAuthLoading: (state, action) => {
            state.isLoadingAuth = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
          
            .addCase(signupUser.pending, (state) => {
                state.isLoadingAuth = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.isLoadingAuth = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoadingAuth = false;
                state.error = action.payload;
                state.user = null;
                state.isAuthenticated = false;
            })
          
    },
});

export const { resetAuthState, setUser, clearUser, setAuthLoading } = authSlice.actions;


