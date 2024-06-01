import axios from "axios";
import { envs } from "../enviroments/enviroments.js";

export const BASE_URL_COMPANY = axios.create({
    baseURL: `http://${envs.DB_HOST}:${envs.PORT_COMPANY}/api/v1`
    // baseURL: `http://localhost:3000/api/v1`
})
export const BASE_URL_USER = axios.create({
    baseURL: `http://${envs.DB_HOST}:${envs.PORT_USER}/api/v1`
    // baseURL: `http://localhost:3000/api/v1`
})

