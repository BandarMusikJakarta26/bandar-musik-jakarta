import axios, { AxiosResponse } from "axios"
import React from "react"
import { host } from "../../libs/config"

export async function getBrandWithLimit(setBrands: React.SetStateAction<any[] | any>){
    const response = await axios.get(`${host}/admin/brand/20`) as AxiosResponse
    return setBrands(response.data.brands)
}

export async function getBrandByName(setBrand: React.SetStateAction<any[] | any>, setLoading: React.SetStateAction<any[] | any>,name: string){
    setLoading(true)
    const response = await axios.get(`${host}/brand/${name}`)
    setLoading(false)
    return setBrand(response.data.brand)
}
    