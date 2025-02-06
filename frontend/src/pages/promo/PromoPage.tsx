import React, { useEffect, useState } from "react"
import getProductByPromo from "../../action/produk.action"
import ShowAllProducts from "../../components/ShowAllProducts"

const PromoPage = function(){
    const [ products, setProducts ] = useState<any[]>([])
    useEffect(()=>{ getProductByPromo(products, setProducts) }, [])

    return (
        <div className="mobile px-6 md:px-0 flex flex-col gap-y-8">
            {/* <BrandTitle brand={brand}/> */}
            {/* <div className="line w-full h-[2px] bg-third"></div> */}
            <ShowAllProducts according="promo" products={products} deleteAction={false}/>
        </div>
    )
}

export default React.memo(PromoPage)