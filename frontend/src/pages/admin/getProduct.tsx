import { lazy, Suspense, useEffect, useState } from "react"
import { deleteProduk, getProducts, getProductsWithFilter } from "../../action/produk.action"
const ShowAllProducts = lazy(()=>import("../../components/ShowAllProducts"))
import LoadingComponent from "../../components/LoadingComponent"
import { useSearchParams } from "react-router"

export default function GetProduct(){
    const [products, setProducts] = useState<any[]>([])
    const [ searchParams ] = useSearchParams()

    useEffect(()=>{
        if(searchParams.get('kategori')) getProductsWithFilter(setProducts, searchParams.get('kategori')!, null)
        else if(searchParams.get('brand')) getProductsWithFilter(setProducts, null, searchParams.get('brand')!)
        else getProducts(products, setProducts)
    },[])

    async function deleteProdukByUrl(url: string){
        const response = await deleteProduk(url)
        if(!response.data.success) return true
        const sisaProduk = products.filter((product)=>product.url !== response.data.produk)
        return await getProducts(sisaProduk)
    }

    return ( 
        <div className="base-products px-4 flex flex-col pt-28">
            <Suspense fallback={<LoadingComponent/>}>
                <ShowAllProducts products={products} according="admin" deleteAction={deleteProdukByUrl} setProducts={setProducts} login={false}/>
            </Suspense>
        </div>
    )
}