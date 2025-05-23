import React from "react"
import ShowAllProducts from "../../../components/ShowAllProducts"

const ProductList = function({ products, login, setProducts }:{ products: any[] | any, login: boolean, setProducts: any }){
    return (
        <>
            { products.length > 0 && <ShowAllProducts products={products} according="category" deleteAction={false} setProducts={setProducts} login={login}/> }
        </>
    )
}

export default React.memo(ProductList)