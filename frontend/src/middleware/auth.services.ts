import axios from "axios"
import { host } from "../../libs/config"

export async function checkAdmin(){
    const response = await axios.get(`${host}/admin/verify`)
    if(response.data.success) return true
    else return false
}