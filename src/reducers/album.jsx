import { createSlice } from "@reduxjs/toolkit";

const albumSlice = createSlice({
    name : "album",
    initialState : {
        toggle : false, 
        moods : null , 
        artist : null , 
        genre : null, 
        id : null ,
    },
    reducers : {
        changeToggle : (state) => {
            state.toggle = !state.toggle;
        },
        changeAlbum : (state,action) => {
            state.moods = action.payload.moods; 
            state.artist = action.payload.artist;
            state.genre = action.payload.genre ;
            state.id = action.payload.id ;
        }
    }
});export default albumSlice.reducer ; export const {changeToggle , changeAlbum} = albumSlice.actions ;