import axios, { AxiosResponse } from "axios"
import { host } from "../../libs/config"
import axiosClient from "../../libs/axiosConfig"

export async function getProductByBrand(setProductByBrand: React.SetStateAction<any[] | any>, brandName: string){
    const productsByBrand = await axiosClient.get(`api/produk/brand/${brandName}`) as AxiosResponse
    console.log(productsByBrand)
    return setProductByBrand(productsByBrand.data.produk)
}

export async function getProductByCategory(setProductByCategory: React.SetStateAction<any[] | any>, category: string){
    const response = await axios.get(`${host}/produk/kategori/${category}`) as AxiosResponse
    return setProductByCategory(response.data.produk)
}

export async function getProductByName(setProduct: React.SetStateAction<any[] | any>, name: string){
    const response = await axiosClient.get(`api/produk/${name}`) as AxiosResponse
    console.log(response)
    return setProduct(response.data.produk)
}

export async function getProducts(setProducts?: React.SetStateAction<any[] | any>){
    const response = await axios.get(`${host}/admin/produk`) as AxiosResponse
    if(!setProducts) return response.data.produk.length
    return setProducts(response.data.produk)
}