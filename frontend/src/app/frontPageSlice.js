//This slice is used by both Login component and 
//Register Component. Hence the need to define
//it in a more central location

import { createSlice } from "@reduxjs/toolkit";

export const frontPageSlice = createSlice({
    name: 'frontPage',
    initialState: {
        trending: [],
        latest: [],
        viewed: [],
        used: true
    },
    reducers: {
        loadFrontPageData: (state, action) => {
            return {
                ...state,
                trending: action.payload.trending,
                latest: action.payload.latest,
                viewed: action.payload.viewed,
                used: false
            }
        },
        dataUsed: (state) => {
            return {
                ...state,
                used: true
            }
        },
    }
});

export const { loadFrontPageData, dataUsed } = frontPageSlice.actions;
export default frontPageSlice.reducer;