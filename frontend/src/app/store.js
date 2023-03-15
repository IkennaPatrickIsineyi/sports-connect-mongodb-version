import { configureStore } from '@reduxjs/toolkit';
import routeSlice from './routeSlice';
import userDataReducer from './userDataSlice';

//Redux global store
export default configureStore({
    reducer: {
        userData: userDataReducer,
        route: routeSlice,
    }
});