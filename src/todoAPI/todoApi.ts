import axios from "axios";


const todoApi = axios.create({
    baseURL: '/api'
})

export default todoApi;