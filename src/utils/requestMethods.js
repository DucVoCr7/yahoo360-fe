import axios from "axios"

const baseURL = 'https://server-yahoo360v2.herokuapp.com/api'

export const publicRequest = axios.create({
    baseURL: baseURL
})



export const userRequest = axios.create({
    baseURL: baseURL,
})

userRequest.interceptors.request.use(config => {
    const accessToken = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).accessToken
    console.log(accessToken)
    config.headers.Authorization =  accessToken ? `Bearer ${accessToken}` : '';
    return config
})



export const logoutRequest = axios.create({
    baseURL: baseURL,
})
logoutRequest.interceptors.request.use(config => {
    const refreshToken = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).refreshToken
    console.log(refreshToken)
    config.body.refreshToken = refreshToken ? refreshToken : '';
    return config
})





