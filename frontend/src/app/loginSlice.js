//This slice is used by both Login component and 
//Register Component. Hence the need to define
//it in a more central location

import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        nextRoute: '',
        returnPath: '',
        returnBody: {},
        returnMethod: '',
        isLoggingIn: false,
        loginComplete: true
    },
    reducers: {
        reRouteRequest: (state, action) => {
            return {
                ...state,
                reRouting: true,
                nextRoute: action.payload.nextRoute,
                returnPath: action.payload.returnPath,
                isLoggingIn: action.payload.isLoggingIn
            }
        },
        reRouteComplete: (state) => {
            return {
                ...state,
                reRouting: false,
                nextRoute: '',
                returnPath: '',
                isLoggingIn: false,
                loginComplete: true
            }
        },
        loginComplete: (state) => {
            return {
                ...state,
                isLoggingIn: false,
                loginComplete: true
            }
        }
    }
});

export const { reRouteRequest, reRouteComplete, loginComplete } = loginSlice.actions;
export default loginSlice.reducer;