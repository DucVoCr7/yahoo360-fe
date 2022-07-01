import axios from "axios"


const baseURL = 'https://server-yahoo360v2.herokuapp.com/api'
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1NjY1NjcwOSwiZXhwIjoxNjU2NjU4NTA5fQ.IWqCTiyPEB5lDotTevu9m9jKhnH3VQmyMkIEjrDeVnU'
export const publicRequest = axios.create({
    baseURL: baseURL
})
export const userRequest = axios.create({
    baseURL: baseURL,
    headers: {
        authorization: `Bearer ${accessToken}`
    }
})