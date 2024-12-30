import { useEffect, useState } from "react"
import { getBrandsWithLimit } from "../../../action/brand.action"

import ButtonShowBrands from "./ButtonShowBrands"
import BrandHeader from "./BrandHeader"
import BrandList from "./BrandList"

export default function Brand(){
    const [ brands, setBrands ] = useState<any[]>([])

    useEffect(()=>{ getBrandsWithLimit(setBrands, 20) }, [])

    return (
        <div className="brand mt-[70px]">
            <BrandHeader/>
            <BrandList brands={brands}/>
            <ButtonShowBrands/>
        </div>
    )
}