"use client"
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user";
import moodSlice from "./reducers/mood";
import genreSlice from "./reducers/genre";

const Store = configureStore({
    reducer : {
        user : userSlice,
        mood : moodSlice,
        genre : genreSlice,
    }
});export default Store;