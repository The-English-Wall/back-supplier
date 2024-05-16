import axios from "axios";

export const BASE_URL_COMPANY = axios.create({
    baseURL: 'http://localhost:3000/api/v1'
})

