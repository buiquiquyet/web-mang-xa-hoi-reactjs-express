import { createSlice } from "@reduxjs/toolkit";


const feedTextSlice = createSlice({
    name: 'feedText',
    initialState: {
        text: '',
        img: [],
        indexImg: 0,
        checkInputText: 0
    },
    reducers: {
        addText: (state, action) => {
            state.text = action.payload
        },
        addIndexImg: (state, action) => {
            state.indexImg = action.payload
        },
        addCheckInputText: (state, action) => {
            state.checkInputText = action.payload + state.checkInputText
        }
    }
})

export const { addText, addIndexImg, addCheckInputText } = feedTextSlice.actions
export default feedTextSlice.reducer