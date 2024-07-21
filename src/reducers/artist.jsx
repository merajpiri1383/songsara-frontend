import { createSlice } from "@reduxjs/toolkit";

const artistSlice = createSlice({
    name : "artist",
    initialState : {
        toggle : true ,
    },
    reducers : {
        changeToggle : (state) => {
            state.toggle = !state.toggle;
        }
    }
});export default artistSlice.reducer ; export const {changeToggle} = artistSlice.actions;