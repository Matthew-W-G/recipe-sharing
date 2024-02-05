import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedin: false,
        userID: "",
        isLoading: true
    },
    reducers: {
        loginAction: (state, action) => {
            state.isLoggedin = true;
            state.userID = action.payload;
            state.isLoading = false;
        },
        logoutAction: (state) => {
            state.isLoggedin = false;
            state.userID = '';
            state.isLoading = false;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const { loginAction, logoutAction, setLoading } = loginSlice.actions
export default loginSlice.reducer;