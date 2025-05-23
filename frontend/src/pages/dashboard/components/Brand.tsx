import { lazy, Suspense, useEffect, useState } from "react"
import { getBrandsWithLimit } from "../../../action/brand.action"

import BrandHeader from "./BrandHeader"
import LoadingComponent from "../../../components/LoadingComponent"
const BrandList = lazy(()=>import("./BrandList"))

export default function Brand(){
    const [ brands, setBrands ] = useState<any[]>([])

    useEffect(()=>{ getBrandsWithLimit(brands, setBrands) }, [])

    return (
        <div className="brand mt-[100px]">
            <BrandHeader/>
            <Suspense fallback={<LoadingComponent/>}>
                <BrandList brands={brands}/>
            </Suspense>
        </div>
    )
}