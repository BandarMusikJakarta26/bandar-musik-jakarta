import React from "react"
import axiosClient from "../../libs/axiosConfig"
import { AxiosError } from "axios"

export async function getCategories(setCategories?: React.SetStateAction<any[] | any>){
    try{
        const response = await axiosClient.get(`api/kategori`)
        if(!setCategories) return response.data.categories.length
        return setCategories(response.data.categories)
    }catch(err){ if(err instanceof AxiosError) return err.message }
}

export async function getCategoryName(setCategories: React.SetStateAction<any[] | any>){
    try{
        const response = await axiosClient.get(`api/kategori/name`)
        const kategoriMap = response.data.categories.map((kategori: any)=>kategori.title)
        return setCategories({ categoriesName : kategoriMap.filter((value: string, index: number)=>kategoriMap.indexOf(value) === index), categories: response.data.categories })
    }catch(err){ if(err instanceof AxiosError) return err.message }
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

export async function getCategoryByName(setCategory: React.SetStateAction<any[] | any>, title: string){
    const response = await axiosClient.get(`api/kategori/${title}`)
    return setCategory(response.data.category)
}

export async function createCategory(form: FormData){
    return await axiosClient.post(`api/tambah/kategori`, form)
}

export async function updateCategory(form: FormData, title: string){
    return await axiosClient.post(`api/update/kategori/${title}`, form)
}

export async function deleteCategory(title: string, setCategories: any){
    const hapus = await axiosClient.get(`api/hapus/kategori/${title}`)
    if(!hapus.data.success) return true
    else return getCategories(setCategories)
}

export function sortParentCategories(categories: any[], setParents: any){
    let initialParents = [] as any[]
    categories.forEach(category=>{ if(category.parent && !initialParents.includes(category.parent)) initialParents.push(category.parent) })
    initialParents = ['Semua', ...initialParents.sort()]
    return setParents(initialParents)
}

export function sortSubParentCategories(categories: any[], setSubParents: any){
    let initialSubParents = [] as any[]
    categories.forEach(category=>{ if(category.subparent && !initialSubParents.includes(category.subparent)) initialSubParents.push(category.subparent) })
    initialSubParents = initialSubParents.sort()
    return setSubParents(initialSubParents)
}