import { useEffect, useState } from "react"
import { getProducts } from "../../action/produk.action"
import ShowAllProducts from "../../components/ShowAllProducts"
import { FaRegPlusSquare } from "react-icons/fa"

export default function GetProduct(){
    const [products, setProducts] = useState<any[]>([])
    const [ screen, setScreen ] = useState<number>(window.innerWidth)

    useEffect(()=>{
        getProducts(setProducts)
        setScreen(window.innerWidth)
     })

    return ( 
        <div className="base-products px-4 flex flex-col pt-16">
            <div className="header flex items-center mb-6 justify-between">
                <h1 className="md:text-[40px] font-bold tracking-tight text-center">Daftar Produk</h1>
                <a href="/admin/tambah/produk" className="opacity-80 hover:opacity-100 justify-self-center self-center transition-all flex gap-x-1 md:text-[24px]  items-center"><FaRegPlusSquare size={ screen <= 768 ? 16 : 24 } className="relative top-[1px] md:top-[2px]"/>Tambah</a>
            </div>
            <ShowAllProducts products={products} according="produk"/>
        </div>
    )
}