import ShowAllProducts from "../../../components/ShowAllProducts"

export default function ProductList({ products }:{ products: any[] | any }){
    return (
        <div className="product-list w-full grid grid-cols-5 gap-x-8 gap-y-10">
            { products.length > 0 && <ShowAllProducts products={products} according="category"/> }
        </div>
    )
}