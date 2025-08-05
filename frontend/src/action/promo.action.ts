import { AxiosResponse } from "axios"
import axiosClient from "../../libs/axiosConfig"
import { SetStateAction } from "react"
import { IPromo } from "../pages/promo/PromoPage"

export async function getPromos(setPromo: SetStateAction<IPromo[] | any>){
    try{
        const response = await axiosClient.get('api/promo') as AxiosResponse
        return setPromo(response.data.promo)
    }catch(err: any){
        console.log(err)
    }
}