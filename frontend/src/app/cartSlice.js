//This slice is used by both Login component and 
//Register Component. Hence the need to define
//it in a more central location

import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        /* inventoryId */
        inventoryId: [],
    },
    reducers: {
        addToCart: (state, action) => {
            return {
                ...state,
                inventoryId: [...state.inventoryId, ...action.payload.inventoryId],
            }
        }
    }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;