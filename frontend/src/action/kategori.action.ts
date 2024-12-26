import { host } from "../../libs/config"
import axios from "axios"
import React from "react"

export async function getCategories(setCategories: React.SetStateAction<any[] | any>){
    const response = await axios.get(`${host}/admin/kategori`)
    setCategories(response.data.categories)
}

export async function getCategoryByName(setCategory: React.SetStateAction<any[] | any>, name: string){
    const response = await axios.get(`${host}/kategori/${name}`)
    return setCategory(response.data.category)
}