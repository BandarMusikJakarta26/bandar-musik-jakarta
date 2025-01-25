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

export async function getProducts(setProducts?: React.SetStateAction<any[] | any>){
    const response = await axiosClient.get(`api/produk`) as AxiosResponse
    if(!setProducts) return response.data.produk.length
    return setProducts(response.data.produk)
}

export function moneyConverter(money: any){
    if(money.split(' ')){ money = money.split(' ')[0] }
    money = money.split('Rp.')[1].split('')
    if(money.length == 4){
        money.splice(1,0,'.')
    }else if(money.length == 5){
        money.splice(2,0,'.')
    }else if(money.length == 6){
        money.splice(3,0,'.')
    }else if(money.length == 7){
        money.splice(1,0,'.')
        money.splice(5,0,'.')
    }else if(money.length == 8){
        money.splice(2,0,'.')
        money.splice(6,0,'.')
    }
    return `Rp.${money.join('')}`
}