import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import frontPageReducer from './frontPageSlice';
import routeSlice from './routeSlice';
import userDataReducer from './userDataSlice';

export default configureStore({
    reducer: {
        frontPage: frontPageReducer,
        userData: userDataReducer,
        route: routeSlice,
        cart: cartSlice
    }
});