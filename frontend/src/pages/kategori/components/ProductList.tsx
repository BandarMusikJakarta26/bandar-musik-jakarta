import React from "react"
import ShowAllProducts from "../../../components/ShowAllProducts"

const ProductList = function({ products }:{ products: any[] | any }){
    return (
        <>
            { products.length > 0 && <ShowAllProducts products={products} according="category" deleteAction={false}/> }
        </>
    )
}

export default React.memo(ProductList)