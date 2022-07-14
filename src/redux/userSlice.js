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
export const register = createAsyncThunk('users/register', async(userInfo, {rejectWithValue})=> {
    try {
        const response = await publicRequest.post('/register', userInfo)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const logout = createAsyncThunk('users/logout', async ()=> {
    const response = await publicRequest.post('/deleteRefreshToken', {
        refreshToken: JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).refreshToken
    })
    return response.data
})
export const userSlice = createSlice({
    // Name Slice
    name: 'user', 
    initialState: {
        userInfo: null,
        pending: null,
        error: null,
        accessToken: null,
        refreshToken: null,
        friendsRequest: null
    },
    reducers: {
        setFriendsRequest: (state, action)=> {
            state.friendsRequest = action.payload
        }
    },
    extraReducers: {

        // Login
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
        },

        // Register
        [register.pending]: (state)=> {
            state.pending = true
            state.error = false
        },
        [register.fulfilled]: (state, action)=> {
            state.pending = false
            state.error = false
            state.userInfo = action.payload.user
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },
        [register.rejected]: (state, action)=> {
            state.pending = false
            state.error = action.payload
        },

        // Logout
        [logout.fulfilled]: (state)=> {
            state.userInfo = null
            state.accessToken = null
            state.refreshToken = null
            state.friendsRequest = null
        }
    },
})
export const {setFriendsRequest} = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer