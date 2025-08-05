import { useEffect, useState } from "react"
import ShowAllProducts from "../../../components/ShowAllProducts"
import { getProductByBrand, getProductByBrandQueryCategory } from "../../../action/produk.action"
import { useSearchParams } from "react-router"

export default function ProductList({ brand, login }:{ brand: string, login: boolean }){
    const [ products, setProductByBrand ] = useState<any[]>([])
    const [ searchParams ] = useSearchParams()

    useEffect(()=>{
        if(searchParams.get('kategori')) getProductByBrandQueryCategory(setProductByBrand, brand!, searchParams.get('kategori')!)
        if(searchParams.get('minimal') && searchParams.get('maximal')) getProductByBrand(setProductByBrand, brand!, searchParams.get('minimal')!, searchParams.get('maximal')!)
        else getProductByBrand(setProductByBrand, brand!)
    },[])
    
    return (
        <>
            { products.length > 0 && <ShowAllProducts products={products} according="brand" deleteAction={false} setProducts={setProductByBrand} login={login}/> }
        </>
    )
}