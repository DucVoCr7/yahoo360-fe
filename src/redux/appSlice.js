import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../utils/requestMethods";
export const appStart = createAsyncThunk('app/start', async()=> {
    const response = await publicRequest.get('/allcodes')
    return response.data
})
export const appSlice = createSlice({
    // Name Slice
    name: 'app', 
    initialState: {
        category: null,
        gender: null,
        position: null,
        role: null
    },
    reducers: {},
    extraReducers: {
        [appStart.fulfilled]: (state, action)=> {
            const category = action.payload.data.filter(element=> element.type === 'category')
            const gender = action.payload.data.filter(element=> element.type === 'gender')
            const position = action.payload.data.filter(element=> element.type === 'position')
            const role = action.payload.data.filter(element=> element.type === 'role')
            state.category = category
            state.gender = gender
            state.position = position
            state.role = role
        }
    }
})

const appReducer = appSlice.reducer
export default appReducer