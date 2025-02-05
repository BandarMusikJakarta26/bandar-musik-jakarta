import { lazy, Suspense, useEffect, useState } from "react"
import { deleteProduk, getProducts } from "../../action/produk.action"
const ShowAllProducts = lazy(()=>import("../../components/ShowAllProducts"))
import { FaRegPlusSquare } from "react-icons/fa"
import LoadingComponent from "../../components/LoadingComponent"

export default function GetProduct(){
    const [products, setProducts] = useState<any[]>([])
    const [ screen, setScreen ] = useState<number>(window.innerWidth)

    useEffect(()=>{
        getProducts(products, setProducts)
        setScreen(window.innerWidth)
     })

    async function deleteProdukByUrl(url: string){
        const response = await deleteProduk(url)
        if(!response.data.success) return true
        const sisaProduk = products.filter((product)=>product.url !== response.data.produk)
        return await getProducts(sisaProduk) }

    return ( 
        <div className="base-products px-4 flex flex-col pt-16">
            <div className="header flex items-center mb-6 justify-between">
                <h1 className="md:text-[40px] font-bold tracking-tight text-center">Daftar Produk</h1>
                <a href="/admin/tambah/produk" className="opacity-80 hover:opacity-100 justify-self-center self-center transition-all flex gap-x-1 md:text-[24px]  items-center"><FaRegPlusSquare size={ screen <= 768 ? 16 : 24 } className="relative top-[1px] md:top-[2px]"/>Tambah</a>
            </div>
            <Suspense fallback={<LoadingComponent/>}>
                <ShowAllProducts products={products} according="admin" deleteAction={deleteProdukByUrl}/>
            </Suspense>
        </div>
    )
}