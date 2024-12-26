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