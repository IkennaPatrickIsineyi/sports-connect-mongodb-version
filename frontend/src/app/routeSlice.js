//This slice is used by both Login component and 
//Register Component. Hence the need to define
//it in a more central location

import { createSlice } from "@reduxjs/toolkit";

export const routeSlice = createSlice({
    name: 'route',
    initialState: {
        reRouting: false,
        nextRoute: '',
        returnPath: '',
        returnBody: {},
        returnMethod: '',
        isLoggingIn: false,
        loginComplete: true,
        /* 'samePage', 'pageSwitch','direct' */
        loginType: '',
        nextRouteState: {},
        showSnackbar: false,
        snackbarMessage: '',
        snackbarSeverity: '',
        blockView: false

    },
    reducers: {
        reRouteRequest: (state, action) => {
            return {
                ...state,
                reRouting: true,
                nextRoute: action.payload.nextRoute,
                returnPath: action.payload.returnPath,
                isLoggingIn: true,
                returnBody: action.payload.returnBody,
                returnMethod: action.payload.returnMethod,
                loginComplete: false,
                loginType: action.payload.loginType,
                nextRouteState: action.payload.nextRouteState,

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
                loginComplete: true,
                loginType: '',
                returnPath: '',
                returnBody: {},
                returnMethod: '',
            }
        },
        closeSnackbar: (state) => {
            return {
                ...state,
                showSnackbar: false,
                snackbarMessage: '',
                snackbarSeverity: ''
            }
        },
        openSnackbar: (state, action) => {
            return {
                ...state,
                showSnackbar: true,
                snackbarMessage: action.payload.message,
                snackbarSeverity: action.payload.severity
            }
        },
        toggleBlockView: (state, action) => {
            return {
                ...state,
                blockView: action.payload.blockView,
            }
        }
    }
});

export const { reRouteRequest, reRouteComplete, loginComplete,
    closeSnackbar, openSnackbar, toggleBlockView } = routeSlice.actions;
export default routeSlice.reducer;