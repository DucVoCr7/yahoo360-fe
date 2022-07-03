import axios from "axios"


const baseURL = 'https://server-yahoo360v2.herokuapp.com/api'
// JSON.parse(JSON.parse(localStorage.getItem("persist:root")).accessToken);
const accessToken = 'asd'
export const publicRequest = axios.create({
    baseURL: baseURL
})
export const userRequest = axios.create({
    baseURL: baseURL,
    headers: {
        authorization: `Bearer ${accessToken}`
    }
})