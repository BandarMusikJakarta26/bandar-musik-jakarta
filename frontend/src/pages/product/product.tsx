import { useParams } from "react-router"
import { RiShoppingBagLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { getProductByName } from "../../action/produk.action";
import { cloudSDK } from "../../../libs/config";
import { AdvancedImage } from "@cloudinary/react";

export default function Product(){
    const { name } = useParams()
    const [ product, setProduct ] = useState<any | null>(null)
    const [ active, setActive ] = useState<string | null>(null)

    useEffect(()=>{ getProductByName(setProduct, name!) }, [])

    function ShowMiniImages({productImages}: { productImages: any[] }){
        return productImages.map((image: string, index: number)=>{
            return <div className={`${active == image || ( image == product.images[0] && !active ) ? 'brightness-100' : 'brightness-[0.6] scale-90'} border-2 border-third h-auto bg-primary hover:cursor-pointer`} onClick={()=>setActive(image)} key={index}>
                <AdvancedImage cldImg={cloudSDK.image(image)} className="h-[100px]"/>
            </div>
        })
    }

    if(!product) return false
    else return (
        <div className="main w-full flex justify-between mt-6 py-20 px-10 relative">
            <div className="area-gambar w-[34%] relative z-10">

            <div className="gambar h-auto px-10 mb-3">
                <div className="group gambar-produk w-full h-full">
                    {product.images.length > 0 ? <AdvancedImage cldImg={cloudSDK.image(active ? active : product.images[0])} className="group-hover:scale-150 group-hover:cursor-grab transition-all"/> : <h1>{product.name}</h1>}
                </div>
            </div>
            <div className={`gambarmini grid grid-cols-4 gap-x-2 px-10`}>
                <ShowMiniImages productImages={product.images}/>
            </div>

            </div>

            <div className="gambar h-[240px] w-[240px] p-10 bg-second absolute z-0 top-[180px] rounded-full"></div>
            <div className="tulisan flex flex-col gap-y-4 w-[60%]">
                <div className="brandName flex">
                    <a className="font-bold mb-[-20px] px-4 py-[2px] border-2 border-third hover:brightness-90 transition-all" href={`/brand/${product.brandName}`}>{product.brandName}</a>
                </div>
                <h1 className="text-[45px] font-bold">{product.name}</h1>
                <p className="font-bold opacity-70">Deskripsi Produk</p>
                <div className="garis h-[2px] w-[130px] bg-third rounded-full mt-[-8px]"></div>
                <p className="text-[14px] text-justify mt-[-12px]">{product.deskripsi}</p>
                <div className="pembelian flex justify-between w-full mt-2">
                    <p className="text-[36px] font-bold tracking-tight">{product.harga}</p>
                    <a href={product.tokopedia} className="py-2 px-8 bg-green-600 text-primary self-center flex items-center gap-x-2 rounded-3xl" target="_blank"><RiShoppingBagLine size={20}/>Beli Barang</a>
                </div>
            </div>
        </div>
    )
}