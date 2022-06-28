import axios from "axios"


const baseURL = 'https://server-yahoo360v2.herokuapp.com'
export const publicRequest = axios.create({
    baseURL: baseURL
})
export const userRequest = axios.create({
    baseURL: baseURL,
    headers: {
        authorization: `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:root")).accessToken)}`
    }
})