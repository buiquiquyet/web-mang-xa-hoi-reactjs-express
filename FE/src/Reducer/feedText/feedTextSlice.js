import { createSlice } from "@reduxjs/toolkit";


const feedTextSlice = createSlice({
    name: 'feedText',
    initialState: {
        text: '',
        img: []
    },
    reducers: {
        addText: (state, action) => {
            state.text = action.payload
        }
    }
})

export const { addText } = feedTextSlice.actions
export default feedTextSlice.reducer