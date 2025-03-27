// src/components/AuthStateListener.js
import React, { useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../Store/authSlice';// Import the setUser action

const AuthStateListener = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            dispatch(setUser(authUser ? { uid: authUser.uid, email: authUser.email } : null));
        });

        return () => unsubscribe(); // Unsubscribe on unmount
    }, [dispatch]);

    return null; // This component doesn't render anything
};

export default AuthStateListener;