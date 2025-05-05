import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        // Si ça se passe bien
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null
        },
        // Si ça ne se passe pas bien
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false
        }
    }
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions

export default userSlice.reducer