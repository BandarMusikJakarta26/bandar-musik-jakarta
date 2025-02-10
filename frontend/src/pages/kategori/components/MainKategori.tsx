import React, { lazy, Suspense, useEffect, useState } from "react"
import { useParams } from "react-router"

import LoadingPage from "../../../components/LoadingPage"
import { getCategoryByName } from "../../../action/kategori.action"
import { getProductByCategory } from "../../../action/produk.action"
import { host } from "../../../../libs/config"
import LoadingComponent from "../../../components/LoadingComponent"
const ProductList = lazy(()=>import('./ProductList'))

const MainKategori = function(){
    const { name } = useParams()
    const [ category, setCategory ] = useState<any>(null)
    const [ products, setProducts ] = useState<any>(null)
    const [ loading, setLoading ] = useState<boolean>(true)

    useEffect(()=>{
        setTimeout(()=>{
            getCategoryByName(setCategory, name!)
            getProductByCategory(setProducts, name!)
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
            <div className="title w-full flex flex-col justify-center items-center">
                <img src={`${host}/storage/${category.image}`} alt={category.title}/> 
                <h1 className="text-[90px] font-bold tracking-tight">{category.title}</h1>
                <Suspense fallback={<LoadingComponent/>}>
                    <ProductList products={products}/>
                </Suspense>
            </div>
        </>
    )
    else return <LoadingPage/>
}

export default React.memo(MainKategori)