import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../utils/requestMethods";
export const login = createAsyncThunk('users/login', async(userInfo, {rejectWithValue})=> {
    try {
        const response = await publicRequest.post('/login', userInfo)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const userSlice = createSlice({
    // Name Slice
    name: 'user', 
    initialState: {
        userInfo: null,
        pending: null,
        error: null,
        accessToken: null,
        refreshToken: null
    },
    reducers: {},
    extraReducers: {
        [login.pending]: (state)=> {
            state.pending = true
            state.error = false
        },
        [login.fulfilled]: (state, action)=> {
            state.pending = false
            state.error = false
            state.userInfo = action.payload.user
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },
        [login.rejected]: (state, action)=> {
            state.pending = false
            state.error = action.payload
        }
    }
})

const userReducer = userSlice.reducer
export default userReducer