"use client"
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user";
import moodSlice from "./reducers/mood";

const Store = configureStore({
    reducer : {
        user : userSlice,
        mood : moodSlice
    }
});export default Store;