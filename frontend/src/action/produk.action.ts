import axios, { AxiosResponse } from "axios"
import { host } from "../../libs/config"
import axiosClient from "../../libs/axiosConfig"

export async function getProductByBrand(setProductByBrand: React.SetStateAction<any[] | any>, brandName: string){
    const productsByBrand = await axiosClient.get(`api/produk/brand/${brandName}`) as AxiosResponse
    return setProductByBrand(productsByBrand.data.produk)
}

export async function getProductByCategory(setProductByCategory: React.SetStateAction<any[] | any>, category: string){
    const response = await axios.get(`${host}/produk/kategori/${category}`) as AxiosResponse
    return setProductByCategory(response.data.produk)
}

export async function getProductByName(setProduct: React.SetStateAction<any[] | any>, name: string){
    const response = await axiosClient.get(`api/produk/${name}`) as AxiosResponse
    return setProduct(response.data.produk)
}

export async function getProductByUrl(setProduct: React.SetStateAction<any[] | any>, url: string){
    const response = await axiosClient.get(`api/produk/url/${url}`) as AxiosResponse
    return setProduct(response.data.produk)
}

export async function getProducts(setProducts?: React.SetStateAction<any[] | any>){
    const response = await axiosClient.get(`api/produk`) as AxiosResponse
    if(!setProducts) return response.data.produk.length
    return setProducts(response.data.produk)
}

export function setCurrency(harga: string){
    if(harga !== "Rp." && harga !== ""){
        const number = Number(harga.split('Rp.')[1])
        const currency = number.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
        })
        return currency
    } else return harga
}