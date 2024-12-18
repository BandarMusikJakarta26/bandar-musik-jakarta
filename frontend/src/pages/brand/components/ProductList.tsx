import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { host } from "../../../../libs/config"

export default function ProductList({ brand }:{ brand: string }){
    const [ products, setProductByBrand ] = useState<any[]>([])

    async function getProductByBrand(){
        const productsByBrand = await axios.get(`${host}/produk/${brand}`) as AxiosResponse
        setProductByBrand(productsByBrand.data.produk)
    }

    function ShowAllProducts(){
        return products.map((product, index)=>{
            return (
                <a className="group card shadow-xl p-6 relative flex flex-col gap-y-3"key={index} href={product.tokopedia} target="_blank">
                    <div className="name-product">
                        <h1 className="text-[32px] font-extrabold">{product.categoryName}</h1>
                        <p className="text-[16px] font-semibold opacity-60 mt-[-8px]">{product.name}</p>
                    </div>
                    <div className="gambar rounded-full scale-100 group-hover:bg-[#fafafa] group-hover:scale-[1.03] transition-all">
                        <img src={`${host}/images/brand/${product.image}`} alt={product.image} width={300} className="group-hover:scale-[1.03] transition"/>
                    </div>
                    <p className="text-[28px] font-extrabold text-center tracking-tight">{product.harga}</p>
                </a>
            )
        })
    }

    useEffect(()=>{
        getProductByBrand()
    },[])

    return (
        <div className="product-list w-full grid grid-cols-5 gap-x-8 gap-y-10">
            { products.length > 0 && <ShowAllProducts/> }
        </div>
    )
}