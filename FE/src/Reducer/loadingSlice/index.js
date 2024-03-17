import { createSlice } from "@reduxjs/toolkit";


const loadingSlice = createSlice({
    name: 'loadingSlice',
    initialState: {
        status: 0,
        isCheckFeed: '',
        totalNewFeedCount: 0
    },
    reducers: {
        addLoadingDone: (state, action) => {
            state.status = action.payload
        },
        addIsCheckFeed: (state, action) => {
            state.isCheckFeed = action.payload
        },
        addTotalNewFeedCount: (state, action) => {
            state.totalNewFeedCount = action.payload
        }
    }
})

export const { addLoadingDone, addIsCheckFeed, addTotalNewFeedCount } = loadingSlice.actions
export default loadingSlice.reducer