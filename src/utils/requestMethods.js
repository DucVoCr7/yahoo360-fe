import axios from "axios"
import jwt_decode from "jwt-decode";
import {store} from '../redux/store'
import { refreshToken } from "../redux/userSlice";

axios.defaults.baseURL = process.env.REACT_APP_BACK_END_URL
// axios.defaults.baseURL = 'https://server-yahoo360v2.herokuapp.com/api'

export const publicRequest = axios.create({})

export const userRequest = axios.create({})
userRequest.interceptors.request.use( async config => {
    const accessToken = store.getState().user.accessToken
    if (accessToken) {
        let currentDate = new Date();
        const decodedToken = jwt_decode(accessToken);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            await store.dispatch(refreshToken())
        }
        config.headers.Authorization = `Bearer ${store.getState().user.accessToken}`
    }

    // const accessToken = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).accessToken
    // config.headers.Authorization = `Bearer ${store.getState().user.accessToken}`
    
    return config
})









