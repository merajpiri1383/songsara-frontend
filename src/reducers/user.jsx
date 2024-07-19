import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        email : null,
        is_login : false , 
        username : null , 
    },
    reducers : {
        changeUser : (state,actions) => {
            state.email = actions.payload.email ;
            state.is_login = actions.payload.is_login ; 
            state.username = actions.payload.username ;
        }
    }
});export default userSlice.reducer;export const {changeUser} = userSlice.actions;