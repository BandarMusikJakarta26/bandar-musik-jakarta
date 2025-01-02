import axios, { AxiosResponse } from "axios"
import React from "react"
import { host } from "../../libs/config"

export async function getBrandsWithLimit(setBrands: React.SetStateAction<any[] | any>, limit: number){
    const response = await axios.get(`${host}/admin/brand/${limit}`) as AxiosResponse
    return setBrands(response.data.brands)
}

export async function getBrandByName(setBrand: React.SetStateAction<any[] | any>, setLoading: React.SetStateAction<any[] | any>,name: string){
    setLoading(true)
    const response = await axios.get(`${host}/brand/${name}`)
    setLoading(false)
    return setBrand(response.data.brand)
}

export async function getBrands(setBrands?: React.SetStateAction<any[] | any>){
    const response = await axios.get(`${host}/admin/brand`) as AxiosResponse
    if(!setBrands) return response.data.brands.length
    return setBrands(response.data.brands)
}

export async function getCategories(setCategories: React.SetStateAction<any[] | any>){
    const response = await axios.get(`${host}/admin/kategori`) as AxiosResponse
    return setCategories(response.data.categories)
}
    