import axios from 'axios'
import { host } from './config'
import { buildWebStorage, setupCache } from 'axios-cache-interceptor'

let axiosClient = axios.create({ 
    baseURL: `${host}`,
    headers: {
        "X-Requested-with": "XMLHttpRequest",
        "Accept": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": host,
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Set-Cookie"
    },
    withCredentials: true,
    withXSRFToken: true
}) as any
axiosClient = setupCache(axiosClient, { 
    storage: buildWebStorage(sessionStorage, 'axios-cache:')
 })

export default axiosClient