import { useEffect, useState } from "react";
import getProductByPromo from "../../action/produk.action";
import ShowAllProducts from "../../components/ShowAllProducts";
import { useParams, useSearchParams } from "react-router";

export default function PromoSatuan(){
    const { title } = useParams<string>()
    const [ products, setProducts ] = useState<any[]>([])
    const [searchParams] = useSearchParams()

    useEffect(()=>{
        if(searchParams.get('minimal') && searchParams.get('maximal')) getProductByPromo(products, setProducts, title!, searchParams.get('minimal')!, searchParams.get('maximal')!)
        else getProductByPromo(products, setProducts, title)
     }, [])

    return (
        <ShowAllProducts according="promo" products={products} deleteAction={false} setProducts={setProducts} login={false}/>
    )
}