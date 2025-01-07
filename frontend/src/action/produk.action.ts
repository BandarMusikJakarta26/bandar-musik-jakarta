import axios, { AxiosResponse } from "axios"
import { host } from "../../libs/config"

export async function getProductByBrand(setProductByBrand: React.SetStateAction<any[] | any>, brand: string){
    const productsByBrand = await axios.get(`${host}/produk/brand/${brand}`) as AxiosResponse
    return setProductByBrand(productsByBrand.data.produk)
}

export async function getProductByCategory(setProductByCategory: React.SetStateAction<any[] | any>, category: string){
    const response = await axios.get(`${host}/produk/kategori/${category}`) as AxiosResponse
    return setProductByCategory(response.data.produk)
}

export async function getProductByName(setProduct: React.SetStateAction<any[] | any>, name: string){
    const response = await axios.get(`${host}/produk/${name}`) as AxiosResponse
    return setProduct(response.data.produk)
}

export async function getProducts(setProducts?: React.SetStateAction<any[] | any>){
    const response = await axios.get(`${host}/admin/produk`) as AxiosResponse
    if(!setProducts) return response.data.produk.length
    return setProducts(response.data.produk)
}