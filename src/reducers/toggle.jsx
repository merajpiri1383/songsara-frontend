import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name: "toggle",
    initialState: {
        tracks_album: false,
    },
    reducers: {
        changeToggleTrackAlbum: (state) => {
            state.tracks_album = !state.tracks_album
        }
    }
}); export const { changeToggleTrackAlbum } = toggleSlice.actions; export default toggleSlice.reducer;