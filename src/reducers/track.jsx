import { createSlice } from "@reduxjs/toolkit";

const trackSlice = createSlice({
    name: "toggle",
    initialState: {
        tracks_album: false,
        track_next : false , 
        track_before : false ,
    },
    reducers: {
        changeToggleTrackAlbum: (state) => {
            state.tracks_album = !state.tracks_album
        },
        changeToggleTrackNext : (state) => {
            state.track_next = !state.track_next
        },
        changeToggleTrackBefore : (state) => {
            state.track_before = !state.track_before
        }
    }
}); export const { changeToggleTrackAlbum ,changeToggleTrackBefore, changeToggleTrackNext } = trackSlice.actions; export default trackSlice.reducer;