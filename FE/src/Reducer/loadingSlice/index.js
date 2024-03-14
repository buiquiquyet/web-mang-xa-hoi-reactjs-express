import { createSlice } from "@reduxjs/toolkit";


const loadingSlice = createSlice({
    name: 'loadingSlice',
    initialState: {
        status: 0
    },
    reducers: {
        addLoadingDone: (state, action) => {
            state.status = action.payload
        }
    }
})

export const { addLoadingDone } = loadingSlice.actions
export default loadingSlice.reducer