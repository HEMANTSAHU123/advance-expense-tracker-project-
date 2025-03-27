import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authSlice';
import { loginSlice } from './loginSlice';
import { expenseSlice } from './expenseSlice';
const store=configureStore({
    reducer:{
      
    auth:authSlice.reducer,
    login:loginSlice.reducer,
    expense:expenseSlice.reducer

       
    }
})
export default store;



