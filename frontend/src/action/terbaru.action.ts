import axios from "axios"
import { host } from "../../libs/config"
import { SetStateAction } from "react"

export async function getTerbaru(setTerbaru : SetStateAction<any[] | any>, limit?: number){
    let response
    if(limit) response = await axios.get(`${host}/admin/terbaru/${limit}`)
    else response = await axios.get(`${host}/admin/terbaru/`)
    return setTerbaru(response!.data.terbaru)
  }