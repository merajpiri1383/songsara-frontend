"use client"
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user";
import albumSlice from "./reducers/album";
import trackSlice from "./reducers/track";
import toggleSlice from "./reducers/toggle";
 
const Store = configureStore({
    reducer : {
        user : userSlice,
        album : albumSlice,
        track : trackSlice,
        toggle : toggleSlice ,
    }
});export default Store;