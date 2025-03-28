// Store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';

// Async Thunk for User Signup
export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
            const user = userCredential.user;
            // You might want to fetch additional user data here if needed
            return {
                uid: user.uid,
                email: user.email,
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async Thunk for User Login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
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

// Async Thunk for User Logout
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null, // Changed to null initially
        isLoadingAuth: false,
        error: null,
        isAuthenticated: false,
    },
    reducers: {
        resetAuthState: (state) => { // Renamed for clarity
            state.isLoadingAuth = false;
            state.error = null;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload; // Set isAuthenticated based on user presence
            state.isLoadingAuth = false; // Authentication process is complete
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
            // Signup User
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
            // Login User
            .addCase(loginUser.pending, (state) => {
                state.isLoadingAuth = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoadingAuth = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoadingAuth = false;
                state.error = action.payload;
                state.user = null;
                state.isAuthenticated = false;
            })
            // Logout User
            .addCase(logoutUser.pending, (state) => {
                state.isLoadingAuth = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoadingAuth = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoadingAuth = false;
                state.error = action.payload;
            });
    },
});

export const { resetAuthState, setUser, clearUser, setAuthLoading } = authSlice.actions;


export const listenForAuthChanges = () => (dispatch) => {
    dispatch(setAuthLoading(true));
    onAuthStateChanged(auth, (user) => {
        if (user) {
      
            dispatch(setUser({ uid: user.uid, email: user.email }));
        } else {
          
            dispatch(clearUser());
        }
        dispatch(setAuthLoading(false));
    });
};