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
     }, [])

    return ( 
        <div className="base-products px-4 flex flex-col pt-16">
            <h1 className="text-[26px] font-bold tracking-tight text-center mb-6">Daftar Produk</h1>
            <div className="products flex flex-col md:grid md:grid-cols-4 gap-8">
                <ShowAllProducts products={products} according="produk"/>
                <a href="/admin/tambah/produk" className="opacity-80 hover:opacity-100 justify-self-center self-center transition-all"><FaRegPlusSquare size={ screen <= 768 ? 70 : 260 }/></a>
            </div>
        </div>
    )
}