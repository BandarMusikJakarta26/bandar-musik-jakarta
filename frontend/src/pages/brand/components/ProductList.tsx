import { useEffect, useState } from "react"
import ShowAllProducts from "../../../components/ShowAllProducts"
import { getProductByBrand } from "../../../action/produk.action"

export default function ProductList({ brand }:{ brand: string }){
    const [ products, setProductByBrand ] = useState<any[]>([])

    useEffect(()=>{ getProductByBrand(setProductByBrand, brand) },[])

    return (
        <>
            { products.length > 0 && <ShowAllProducts products={products} according="brand"/> }
        </>
    )
}