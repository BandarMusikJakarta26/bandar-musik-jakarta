import React from "react"
import axiosClient from "../../libs/axiosConfig"
import { AxiosError } from "axios"

export async function getCategories(setCategories?: React.SetStateAction<any[] | any>){
    const response = await axiosClient.get(`api/kategori`)
    if(!setCategories) return response.data.categories.length
    return setCategories(response.data.categories)
}

export async function getCategoriesWithLimit(categories: any, setCategories?: React.SetStateAction<any[] | any>){
    try{
        if(categories.length > 0) return setCategories(categories)
        const response = await axiosClient.get(`api/kategori?limit=30`)
        if(!setCategories) return response.data.categories.length
        return setCategories(response.data.categories)
    }catch(err){
        if(err instanceof AxiosError) err.status == 429 ? console.log(true) : console.log(false)
    }
}

export async function getCategoryByName(setCategory: React.SetStateAction<any[] | any>, name: string){
    const response = await axiosClient.get(`api/kategori/${name}`)
    return setCategory(response.data.category)
}

export async function createCategory(form: FormData){
    return await axiosClient.post(`api/tambah/kategori`, form)
}