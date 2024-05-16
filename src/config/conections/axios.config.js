import axios from "axios";
import { envs } from "../enviroments/enviroments.js";

export const BASE_URL_COMPANY = axios.create({
    baseURL: `http://${envs.DB_HOST}:${envs.DB_PORT}/api/v1}`
})

