"use client"
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user";
import moodSlice from "./reducers/mood";
import genreSlice from "./reducers/genre";
import artistSlice from "./reducers/artist";

const Store = configureStore({
    reducer : {
        user : userSlice,
        mood : moodSlice,
        genre : genreSlice,
        artist : artistSlice,
    }
});export default Store;