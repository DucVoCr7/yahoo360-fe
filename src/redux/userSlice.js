import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    // Name Slice
    name: 'user', 
    initialState: null,
    reducers: {
        //Actions
        login: (state, action)=> {
            state = action.payload
        }
    }
})

export const {login} = userSlice.actions
export default userSlice.reducer // userReducer