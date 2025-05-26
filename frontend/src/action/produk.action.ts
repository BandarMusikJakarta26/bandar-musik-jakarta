import { AxiosResponse } from "axios"
import axiosClient from "../../libs/axiosConfig"

export async function getProductByBrand(setProductByBrand: React.SetStateAction<any[] | any>, brandName: string){
    const productsByBrand = await axiosClient.get(`api/produk/brand/${brandName}`) as AxiosResponse
    return setProductByBrand(productsByBrand.data.produk)
}

export async function getProductByCategory(setProductByCategory: React.SetStateAction<any[] | any>, kategoriName: string){
    const response = await axiosClient.get(`api/produk/kategori/${kategoriName}`) as AxiosResponse
    return setProductByCategory(response.data.produk)
}

export async function getProductBrandByCategory(setBrands: React.SetStateAction<any[] | any>, kategoriName: string){
    const response = await axiosClient.get(`api/produk/brand/kategori/${kategoriName}`) as AxiosResponse
    const brandMap = response.data.brands.map((brand: any)=>brand.brandId)
    return setBrands({ brandsName : brandMap.filter((value: string, index: number)=>brandMap.indexOf(value) === index), brands: response.data.brands })
}

export async function getProductCategoryByBrand(setCategories: React.SetStateAction<any[] | any>, brandName: string){
    const response = await axiosClient.get(`api/produk/kategori/brand/${brandName}`) as AxiosResponse
    const kategoriMap = response.data.categories.map((kategori: any)=>kategori.kategoriId)
    return setCategories({ categoriesName : kategoriMap.filter((value: string, index: number)=>kategoriMap.indexOf(value) === index), categories: response.data.categories })
}

export async function getProductByBrandQueryCategory(setProductByBrand: React.SetStateAction<any[] | any>, brandName: string, kategoriName: string){
    const response = await axiosClient.get(`api/produk/brand/${brandName}?kategori=${kategoriName}`) as AxiosResponse
    return setProductByBrand(response.data.produk)
}

export async function getProductByCategoryQueryBrand(setProductByCategory: React.SetStateAction<any[] | any>, kategoriName: string, brandName: string){
    const response = await axiosClient.get(`api/produk/kategori/${kategoriName}?brand=${brandName}`) as AxiosResponse
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
    if(products && products.length > 0) return setProducts(products)
    const response = await axiosClient.get(`api/produk`) as AxiosResponse
    if(!setProducts){ 
        const inStock = response.data.produk.filter((produk: any)=>produk.stock > 0).length
        const onStock = response.data.produk.filter((produk: any)=>produk.stock == 0 || !produk.stock).length
        const preOrder = response.data.produk.filter((produk: any)=>produk.stock < 0).length
        return { inStock, onStock, preOrder }
    }
    return setProducts(response.data.produk)
}

export async function getProductsWithFilter(setProducts: React.SetStateAction<any[] | any>, kategori: string | null, brand: string | null){
    let response
    if(kategori) response = await axiosClient.get(`api/produk?kategori=${kategori}`) as AxiosResponse
    if(brand) response = await axiosClient.get(`api/produk?brand=${brand}`) as AxiosResponse
    return setProducts(response!.data.produk)
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

export default async function getProductByPromo(products?: any, setProducts?: React.SetStateAction<any[] | any>, title?: string){
    if(products.length > 0) return setProducts(products)
    const response = await axiosClient.get(`api/produk/promo?title=${title}`)
    if(response.data.success) return setProducts(response.data.produk)
    
}