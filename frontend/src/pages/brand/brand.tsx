import { useEffect, useState } from "react"
import { useParams } from "react-router"

import BrandTitle from "./components/BrandTitle"
import ProductList from "./components/ProductList"
import { getBrandByName } from "../../action/brand.action"
import LoadingPage from "../../components/LoadingPage"
import BlankPage from "../blank"

export default function Brand(){
    const { name } = useParams()
        const [ brand, setBrand ] = useState<any | false>(false)
        const [ loading, setLoading ] = useState<boolean>(false)

        useEffect(()=>{ getBrandByName(setBrand, setLoading, name!) }, [])
    
        if(loading) return ( <LoadingPage/> )
        if(!loading && !brand) return ( <BlankPage/> )
        else return (
            <>
                <BrandTitle brand={brand}/>
                <ProductList brand={brand.name} />
            </>
        )
}