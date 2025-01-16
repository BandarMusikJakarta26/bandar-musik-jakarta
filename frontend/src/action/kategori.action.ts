import React from "react"
import axiosClient from "../../libs/axiosConfig"

export async function getCategories(setCategories?: React.SetStateAction<any[] | any>){
    const response = await axiosClient.get(`api/kategori`)
    if(!setCategories) return response.data.categories.length
    return setCategories(response.data.categories)
}

export async function getCategoriesWithLimit(setCategories?: React.SetStateAction<any[] | any>){
    const response = await axiosClient.get(`api/kategori?limit=30`)
    if(!setCategories) return response.data.categories.length
    return setCategories(response.data.categories)
}

export async function getCategoryByName(setCategory: React.SetStateAction<any[] | any>, name: string){
    const response = await axiosClient.get(`api/kategori/${name}`)
    return setCategory(response.data.category)
}

export async function createCategory(form: FormData){
    return await axiosClient.post(`api/tambah/kategori`, form)
}