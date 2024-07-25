import { createSlice } from "@reduxjs/toolkit";

const trackSlice = createSlice({
    name: "toggle",
    initialState: {
        toggle: false,
        track_next : false , 
        track_before : false ,
    },
    reducers: {
        changeToggleTrack :  (state) => {
            state.toggle = !state.toggle
        },
        changeToggleTrackNext : (state) => {
            state.track_next = !state.track_next
        },
        changeToggleTrackBefore : (state) => {
            state.track_before = !state.track_before
        }
    }
}); export const { changeToggleTrack ,changeToggleTrackBefore, changeToggleTrackNext } = trackSlice.actions; export default trackSlice.reducer;