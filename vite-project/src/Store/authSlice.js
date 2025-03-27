import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase/firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth } from '../firebase/firebase';
export const signupUser = createAsyncThunk(
    'signup/register', 
    async (data) => {
        console.log(data)
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            console.log(userCredential)
            const user = userCredential.user;
            console.log(user);
            if (user) {
                await setDoc(doc(db, 'User', user.uid), {
                    email: user.email,
                });
                return user ;
            }
           return user;
    
        } catch (error) {
            console.log(error.message);
        }
    }
);

export const authSlice = createSlice({
    name: 'signup',
    initialState: {
        user: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        resetSignupState: (state) => {
            state.isLoading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { resetSignupState } = authSlice.actions;
















