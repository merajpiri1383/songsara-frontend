import { createSlice } from "@reduxjs/toolkit";

const albumSlice = createSlice({
    name : "album",
    initialState : {
        toggle : false, 
    },
    reducers : {
        changeToggle : (state) => {
            state.toggle = !state.toggle;
        }
    }
});export default albumSlice.reducer ; export const {changeToggle} = albumSlice.actions ;