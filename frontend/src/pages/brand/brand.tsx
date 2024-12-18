import axios from "axios"
import { useEffect, useState } from "react"
import { host } from "../../../libs/config"
import { useParams } from "react-router"
import BrandTitle from "./components/BrandTitle"
import ProductList from "./components/ProductList"

export default function Brand(){
    const { name } = useParams()
        const [ brand, setBrand ] = useState<any | false>(false)
    
        async function getBrandById(){
            const response = await axios.get(`${host}/brand/${name}`)
            return setBrand(response.data.brand)
        }
    
        useEffect(()=>{ getBrandById() }, [])
    
        if(!brand) return (
            <h1>Loading ...</h1>
        )
        
        return (
            <>
                <BrandTitle brand={brand}/>
                <ProductList brand={brand.name} />
            </>
        )
}