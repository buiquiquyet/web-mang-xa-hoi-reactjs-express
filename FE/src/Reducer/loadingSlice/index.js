import { createSlice } from "@reduxjs/toolkit";


const loadingSlice = createSlice({
    name: 'loadingSlice',
    initialState: {
        status: 0,
        isCheckFeed: false
    },
    reducers: {
        addLoadingDone: (state, action) => {
            state.status = action.payload
        },
        addIsCheckFeed: (state, action) => {
            state.isCheckFeed = action.payload
        }
    }
})

export const { addLoadingDone, addIsCheckFeed } = loadingSlice.actions
export default loadingSlice.reducer