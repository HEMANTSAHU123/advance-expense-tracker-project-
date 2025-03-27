import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authSlice';
import { loginSlice } from './loginSlice';
import { expenseSlice } from './expenseSlice';
import { themeSlice } from './themeSlice';
const store=configureStore({
    reducer:{
      
    auth:authSlice.reducer,
    login:loginSlice.reducer,
    expense:expenseSlice.reducer,
theme:themeSlice.reducer
       
    }
})
export default store;



