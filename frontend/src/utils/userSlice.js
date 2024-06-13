import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    userData: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.isAuthenticated = true;
            state.userData = action.payload;
        },
        // Don't include persistor.purge() here
        logoutUser(state) {
            state.isAuthenticated = false;
            state.userData = null;
        }
    }
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
