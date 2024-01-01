import axios from "axios";

export const BASE_URL = "https://api.themoviedb.org/3"
const TIME_OUT = 30000;
const API_KEY = '2dca580c2a14b55200e784d157207b4d';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT
})

axiosInstance.defaults.params = {};
axiosInstance.interceptors.request.use( (config) => {
    config.params['api_key'] = API_KEY;
    return config;
})

export default axiosInstance;