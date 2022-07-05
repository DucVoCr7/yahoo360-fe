import axios from "axios"

axios.defaults.baseURL = 'https://server-yahoo360v2.herokuapp.com/api'

export const publicRequest = axios.create({})

export const userRequest = axios.create({})
userRequest.interceptors.request.use(config => {
    const accessToken = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).accessToken
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
})





