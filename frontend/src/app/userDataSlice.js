//This slice is used by both Login component and 
//Register Component. Hence the need to define
//it in a more central location (ie, app folder) 
//to avoid unnecessary duplicity of codes

import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        username: '',
        emailVerified: false
    },
    reducers: {
        loadUserData: (state, action) => {
            return {
                ...state,
                username: action.payload.username,
                emailVerified: action.payload.emailVerified
            }
        },
        logOutUser: (state) => {
            return {
                ...state,
                username: '',
                emailVerified: false
            }
        }
    }
});

export const { loadUserData, logOutUser } = userDataSlice.actions;
export default userDataSlice.reducer;