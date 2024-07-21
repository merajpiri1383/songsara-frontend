"use client"
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user";
import moodSlice from "./reducers/mood";
import genreSlice from "./reducers/genre";
import artistSlice from "./reducers/artist";
import albumSlice from "./reducers/album";

const Store = configureStore({
    reducer : {
        user : userSlice,
        mood : moodSlice,
        genre : genreSlice,
        artist : artistSlice,
        album : albumSlice,
    }
});export default Store;