import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    // Name Slice
    name: 'user', 
    initialState: null,
    reducers: {
        //Actions
        login: (state, action)=> {
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },
        logout: (state)=> {
            state.user = null
            state.accessToken = null
            state.refreshToken = null
        },
        update: (state, action)=> {
            state.user = action.payload.user
        }
    }
})

export const {login, logout, update} = userSlice.actions
export default userSlice.reducer // userReducer