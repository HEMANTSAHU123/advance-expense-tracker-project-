
import React, { useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../Store/authSlice';

const AuthStateListener = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            dispatch(setUser(authUser ? { uid: authUser.uid, email: authUser.email } : null));
        });

        return () => unsubscribe(); 
    }, [dispatch]);

   
};

export default AuthStateListener;