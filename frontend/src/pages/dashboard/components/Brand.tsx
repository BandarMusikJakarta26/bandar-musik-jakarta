import { useEffect, useState } from "react"
import { getBrandWithLimit } from "../../../action/brand.action"

import ButtonShowBrands from "./ButtonShowBrands"
import BrandHeader from "./BrandHeader"
import BrandList from "./BrandList"

export default function Brand(){
    const [ brands, setBrands ] = useState<any[]>([])

    useEffect(()=>{ getBrandWithLimit(setBrands) }, [])

    return (
        <div className="brand mt-[70px]">
            <BrandHeader/>
            <BrandList brands={brands}/>
            <ButtonShowBrands/>
        </div>
    )
}