import { useEffect, useState } from "react"
import { useParams } from "react-router"

import LoadingPage from "../../components/LoadingPage"
import BlankPage from "../blank"
import { getCategoryByName } from "../../action/kategori.action"
import { getProductByCategory } from "../../action/produk.action"
import ProductList from "./components/ProductList"

export default function Kategori(){
    const { name } = useParams()
    const [ category, setCategory ] = useState<any | false>(false)
    const [ products, setProducts ] = useState<boolean>(false)
    const [ loading, setLoading ] = useState<boolean>(false)

    useEffect(()=>{
        setLoading(true)
        getCategoryByName(setCategory, name!)
        getProductByCategory(setProducts, name!)
        setLoading(false)
    }, [])

    function ShowBrandByCategory(){
        return category.brands.map((brand: string, index: number)=>{
            return <a href={`/brand/${brand}`} className="opacity-70 hover:opacity-100" key={index}>{brand}</a>
        })
    }

    if(loading) return ( <LoadingPage/> )
    if(!loading && !category) return ( <BlankPage/> )
    else return (
        <>
            <div className="title w-full flex flex-col justify-center items-center">
                <h1 className="text-[90px] font-bold tracking-tight">{category.name}</h1>
                <div className="brandlist flex gap-x-10 text-[20px]">
                    <ShowBrandByCategory/>
                </div>
                <ProductList products={products}/>
            </div>
        </>
    )
}