import { useEffect, useState } from "react"
import { getProducts } from "../../action/produk.action"
import ShowAllProducts from "../../components/ShowAllProducts"

export default function GetProduct(){
    const [products, setProducts] = useState<any[]>([])
    useEffect(()=>{ getProducts(setProducts) }, [])

    return ( 
        <div className="base-products px-4 flex flex-col pt-16">
            <h1 className="text-[26px] font-bold tracking-tight text-center mb-6">Daftar Produk</h1>
            <div className="products flex flex-col md:grid md:grid-cols-4 gap-8">
                <ShowAllProducts products={products} according="produk"/>
            </div>
        </div>
    )
}