import { useEffect, useState } from "react"
import { getProducts } from "../../action/produk.action"
import ShowAllProducts from "../../components/ShowAllProducts"

export default function GetProduct(){
    const [products, setProducts] = useState<any[]>([])
    useEffect(()=>{ getProducts(setProducts) }, [])

    return ( 
        <div className="base-products px-4 flex flex-col gap-y-3 pt-12">
            <h1 className="text-[26px] font-bold tracking-tight text-center">Daftar Produk</h1>
            <ShowAllProducts products={products} according="produk"/>
        </div>
    )
}