import React, { lazy, Suspense, useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router"

import LoadingPage from "../../../components/LoadingPage"
import { getCategoryByName } from "../../../action/kategori.action"
import { getProductByCategory, getProductByCategoryQueryBrand } from "../../../action/produk.action"
import { host } from "../../../../libs/config"
import LoadingComponent from "../../../components/LoadingComponent"
const ProductList = lazy(()=>import('./ProductList'))

const MainKategori = function({ login }:{ login: boolean }){
    const { title } = useParams()
    const [ category, setCategory ] = useState<any>(null)
    const [ products, setProducts ] = useState<any>(null)
    const [ loading, setLoading ] = useState<boolean>(true)
    const [searchParams] = useSearchParams()


    useEffect(()=>{
        setTimeout(()=>{
            getCategoryByName(setCategory,title!)
            if(searchParams.get('brand')) getProductByCategoryQueryBrand(setProducts, title!, searchParams.get('brand')!)
            if(searchParams.get('minimal') && searchParams.get('maximal')) getProductByCategory(setProducts, title!, searchParams.get('minimal')!, searchParams.get('maximal')!)
            else getProductByCategory(setProducts, title!)
            setLoading(false)
        }, 1500)
    }, [])


    // function ShowBrandByCategory(){
    //     return category.brands.map((brand: string, index: number)=>{
    //         return <a href={`/brand/${brand}`} className="opacity-70 hover:opacity-100" key={index}>{brand}</a>
    //     })
    // }

    if(loading) return ( <LoadingPage/> )
    else if(category && products) return (
        <>
            <div className="title w-full flex flex-col justify-center items-center gap-y-10 relative">
                <img src={`${host}/storage/${category.image}`} alt={category.title} className=""/> 
                <div className="bungkus mobile px-6 md:px-0">
                <Suspense fallback={<LoadingComponent/>}>
                    <ProductList products={products} login={login} setProducts={setProducts}/>
                </Suspense>
                </div>
            </div>
        </>
    )
    else return <LoadingPage/>
}

export default React.memo(MainKategori)