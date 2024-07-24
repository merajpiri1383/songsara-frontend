import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name : "toggle" , 
    initialState : {
        artist : false , 
        genre : false ,
        mood : false , 
        playlist : false ,
    },
    reducers : {
        changeToggleArtist : (state) => {
            state.artist = !state.artist ;
        },
        changeToggleGenre : (state) => {
            state.genre = !state.genre;
        },
        changeToggleMood : (state) => {
            state.mood = !state.mood;
        },
        changeTogglePlaylist : (state) => {
            state.playlist = !state.playlist ;
        }
    }
});export default toggleSlice.reducer ; export const {
    changeToggleArtist, 
    changeToggleGenre,
    changeToggleMood,
    changeTogglePlaylist ,
} = toggleSlice.actions;