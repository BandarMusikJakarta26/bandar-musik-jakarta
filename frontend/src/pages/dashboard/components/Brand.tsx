import { useEffect, useState } from "react"
import { getBrandsWithLimit } from "../../../action/brand.action"

import BrandHeader from "./BrandHeader"
import BrandList from "./BrandList"

export default function Brand(){
    const [ brands, setBrands ] = useState<any[]>([])

    useEffect(()=>{ getBrandsWithLimit(setBrands, 20) }, [])

    return (
        <div className="brand mt-[100px]">
            <BrandHeader/>
            <BrandList brands={brands}/>
        </div>
    )
}