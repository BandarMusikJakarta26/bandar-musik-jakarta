import axios from 'axios'
import { host } from './config'

const axiosClient = axios.create({ 
    baseURL: `${host}`,
    headers: {
        "X-Requested-with": "XMLHttpRequest",
        "Accept": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": 'http://localhost/8000',
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Set-Cookie"
    },
    withCredentials: true,
})

export default axiosClient