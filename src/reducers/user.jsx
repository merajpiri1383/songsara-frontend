import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        email : null,
        is_login : false , 
        username : null , 
        is_active : false , 
        is_staff : false ,
    },
    reducers : {
        changeUser : (state,actions) => {
            state.email = actions.payload.email ;
            state.is_login = actions.payload.is_login ; 
            state.username = actions.payload.username ;
            state.is_active = actions.payload.is_active ;
            state.is_staff = actions.payload.is_staff ;
        }
    }
});export default userSlice.reducer;export const {changeUser} = userSlice.actions;