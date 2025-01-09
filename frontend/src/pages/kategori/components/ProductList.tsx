import ShowAllProducts from "../../../components/ShowAllProducts"

export default function ProductList({ products }:{ products: any[] | any }){
    return (
        <>
            { products.length > 0 && <ShowAllProducts products={products} according="category"/> }
        </>
    )
}