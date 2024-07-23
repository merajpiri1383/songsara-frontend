"use client"
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user";
import moodSlice from "./reducers/mood";
import genreSlice from "./reducers/genre";
import artistSlice from "./reducers/artist";
import albumSlice from "./reducers/album";
import toggleSlice from "./reducers/toggle";

const Store = configureStore({
    reducer : {
        user : userSlice,
        mood : moodSlice,
        genre : genreSlice,
        artist : artistSlice,
        album : albumSlice,
        toggle : toggleSlice,
    }
});export default Store;