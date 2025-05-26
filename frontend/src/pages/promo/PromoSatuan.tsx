import { useEffect, useState } from "react";
import getProductByPromo from "../../action/produk.action";
import ShowAllProducts from "../../components/ShowAllProducts";
import { useParams } from "react-router";

export default function PromoSatuan(){
    const { title } = useParams<string>()
    const [ products, setProducts ] = useState<any[]>([])
    useEffect(()=>{ 
        getProductByPromo(products, setProducts, title)
     }, [])

    return (
        <ShowAllProducts according="promo" products={products} deleteAction={false} setProducts={setProducts} login={false}/>
    )
}