import { AxiosResponse } from "axios"
import axiosClient from "../../libs/axiosConfig"

export async function getProductByBrand(setProductByBrand: React.SetStateAction<any[] | any>, brandName: string){
    const productsByBrand = await axiosClient.get(`api/produk/brand/${brandName}`) as AxiosResponse
    return setProductByBrand(productsByBrand.data.produk)
}

export async function getProductByCategory(setProductByCategory: React.SetStateAction<any[] | any>, category: string){
    const response = await axiosClient.get(`api/produk/kategori/${category}`) as AxiosResponse
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

export async function getProducts(products?: any, setProducts?: React.SetStateAction<any[] | any>){
    if(products.length > 0) return setProducts(products)
    const response = await axiosClient.get(`api/produk`) as AxiosResponse
    if(!setProducts) return response.data.produk.length
    return setProducts(response.data.produk)
}

export async function deleteProduk(url: string){
    const response = await axiosClient.get(`api/hapus/produk/${url}`)
    if(!response.data.success) return false
    return response
}

export function setCurrency(harga: string){
    if(harga !== ""){
        const number = Number(harga)
        const currency = number.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
        })
        return currency
    } else return harga
}

export default async function getProductByPromo(products?: any, setProducts?: React.SetStateAction<any[] | any>){
    if(products.length > 0) return setProducts(products)
    const response = await axiosClient.get('api/produk/promo')
    if(response.data.success) return setProducts(response.data.produk)
    
}