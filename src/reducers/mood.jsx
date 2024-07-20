import {createSlice} from "@reduxjs/toolkit";

const moodSlice = createSlice({
    name : "mood",
    initialState : {
        toggle : false ,
    },
    reducers : {
        changeToggle : (state) => {
            state.toggle = !state.toggle
        }
    }
});export default moodSlice.reducer;export const {changeToggle} = moodSlice.actions;