import { AxiosError, AxiosResponse } from "axios"
import React from "react"
import axiosClient from "../../libs/axiosConfig"
// import { axiosConfig } from "../../libs/config"

export async function getBrandsWithLimit(brands: any, setBrands: React.SetStateAction<any[] | any>, limit?: number){
    try{
        if(brands.length > 0) return setBrands(brands)
        const response = await axiosClient.get(`api/brand?limit=${limit}`) as AxiosResponse
        if(!limit) return setBrands(response.data.brands)
        else return setBrands(response.data.brands.splice(0, limit))
    }catch(err:any){
        console.log(err)
    }
}

export async function getBrandByName(setBrand: React.SetStateAction<any[] | any>, setLoading: React.SetStateAction<any[] | any>,name: string){
    setLoading(true)
    const response = await axiosClient.get(`api/brand/${name}`)
    setLoading(false)
    return setBrand(response.data.brand)
}

export async function getBrandName(setBrands: React.SetStateAction<any[] | any>){
    try{
        const response = await axiosClient.get(`api/brand?name=true`)
        console.log(response.data)
        const brandMap = response.data.brands.map((brand: any)=>brand.name)
        return setBrands({ brandsName : brandMap.filter((value: string, index: number)=>brandMap.indexOf(value) === index), brands: response.data.brands })
    }catch(err){ if(err instanceof AxiosError) return err.message }
}

export async function getBrands(setBrands?: React.SetStateAction<any[] | any>){
    const response = await axiosClient.get(`api/brand`) as AxiosResponse
    if(!setBrands) return response.data.brands.length
    return setBrands(response.data.brands)
}

export async function createBrand(form: FormData): Promise<AxiosResponse | any>{
    const response = await axiosClient.post(`api/tambah/brand`, form)
    return response.data
}

export async function deleteBrand(name: string){
    const response = await axiosClient.get(`api/hapus/brand/${name}`)
    if(!response.data.success) return false
    return true
}