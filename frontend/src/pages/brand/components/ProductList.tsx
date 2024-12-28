import { useEffect, useState } from "react"
import ShowAllProducts from "../../../components/ShowAllProducts"
import { getProductByBrand } from "../../../action/produk.action"

export default function ProductList({ brand }:{ brand: string }){
    const [ products, setProductByBrand ] = useState<any[]>([])

    useEffect(()=>{ getProductByBrand(setProductByBrand, brand) },[])

    return (
        <div className="product-list w-full grid grid-cols-1 md:grid-cols-5 gap-y-4 md:gap-x-8 md:gap-y-10">
            { products.length > 0 && <ShowAllProducts products={products} according="brand"/> }
        </div>
    )
}