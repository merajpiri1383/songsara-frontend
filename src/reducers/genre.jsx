import { createSlice } from "@reduxjs/toolkit";

const genreSlice = createSlice({
    name : "genre",
    initialState : {
        toggle : false ,
    },
    reducers : {
        changeToggle : (state) => {
            state.toggle = !state.toggle;
        }
    }
});export const {changeToggle} = genreSlice.actions;export default genreSlice.reducer;