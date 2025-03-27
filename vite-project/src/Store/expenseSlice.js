// Store/expenseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { realtimedatabase } from '../firebase/firebase';
import { ref, push, onValue, remove, update } from 'firebase/database';

export const fetchExpenses = createAsyncThunk(
    'expense/fetchExpenses',
    async (_, { getState }) => {
        const user = getState().auth.user;
        if (user?.uid) {
            const expenseref = ref(realtimedatabase, `users/${user.uid}/expenses`);
            return new Promise((resolve, reject) => {
                onValue(expenseref, (snapshot) => {
                    const data = snapshot.val();
                    const loadedExpenses = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
                    resolve(loadedExpenses);
                }, (error) => {
                    reject(error);
                });
            });
        }
        return [];
    }
);

export const addExpense = createAsyncThunk(
    'expense/addExpense',
    async (expenseData, { getState }) => {
        const user = getState().auth.user;
        console.log(user)

        if (user?.uid) {
            const expenseref = ref(realtimedatabase, `users/${user.uid}/expenses`);
            const newExpenseRef = await push(expenseref, expenseData);
            return { id: newExpenseRef.key, ...expenseData };
        }
        throw new Error('User not authenticated');
    }
);

export const deleteExpense = createAsyncThunk(
    'expense/deleteExpense',
    async (expenseId, { getState }) => {
        const user = getState().auth.user;
        if (user?.uid) {
            const expenseref = ref(realtimedatabase, `users/${user.uid}/expenses/${expenseId}`);
            await remove(expenseref);
            return expenseId;
        }
        throw new Error('User not authenticated');
    }
);

export const updateExpense = createAsyncThunk(
    'expense/updateExpense',
    async ({ id, updatedData }, { getState }) => {
        const user = getState().auth.user;
        if (user?.uid) {
            const expenseref = ref(realtimedatabase, `users/${user.uid}/expenses/${id}`);
            await update(expenseref, updatedData);
            return { id, ...updatedData };
        }
        throw new Error('User not authenticated');
    }
);

export const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
        expenses: [],
        loading: false,
        error: null,
        showPremiumButton: false, // New state for the premium button
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setShowPremiumButton: (state, action) => {
            state.showPremiumButton = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Fetch Expenses
        builder.addCase(fetchExpenses.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchExpenses.fulfilled, (state, action) => {
            state.loading = false;
            state.expenses = action.payload;
            const totalExpense = action.payload.reduce((sum, expense) => sum + parseFloat(expense.totalmoney || 0), 0);
            state.showPremiumButton = totalExpense >= 1000; // CHANGED HERE
        });
        builder.addCase(fetchExpenses.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.expenses = [];
            state.showPremiumButton = false;
        });

        // Add Expense
        builder.addCase(addExpense.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addExpense.fulfilled, (state, action) => {
            state.loading = false;
            state.expenses.push(action.payload);
            const totalExpense = state.expenses.reduce((sum, expense) => sum + parseFloat(expense.totalmoney || 0), 0);
            state.showPremiumButton = totalExpense >= 1000; // CHANGED HERE
        });
        builder.addCase(addExpense.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Delete Expense
        builder.addCase(deleteExpense.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteExpense.fulfilled, (state, action) => {
            state.loading = false;
            state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
            const totalExpense = state.expenses.reduce((sum, expense) => sum + parseFloat(expense.totalmoney || 0), 0);
            state.showPremiumButton = totalExpense >= 1000; 
        });
        builder.addCase(deleteExpense.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

  
        builder.addCase(updateExpense.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateExpense.fulfilled, (state, action) => {
            state.loading = false;
            state.expenses = state.expenses.map(expense =>
                expense.id === action.payload.id ? action.payload : expense
            );
            const totalExpense = state.expenses.reduce((sum, expense) => sum + parseFloat(expense.totalmoney || 0), 0);
            state.showPremiumButton = totalExpense >= 1000; 
        });
        builder.addCase(updateExpense.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const { clearError, setShowPremiumButton } = expenseSlice.actions;