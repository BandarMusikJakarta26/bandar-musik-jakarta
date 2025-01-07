import { useParams } from "react-router"
import { RiShoppingBagLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { getProductByName } from "../../action/produk.action";
import { cloudSDK } from "../../../libs/config";
import { AdvancedImage } from "@cloudinary/react";

export default function Product(){
    const { name } = useParams()
    const [ product, setProduct ] = useState<any | null>(null)

    useEffect(()=>{ getProductByName(setProduct, name!) }, [])

    if(!product) return false
    else return (
        <div className="main w-full flex justify-between py-24">
            <div className="gambar h-auto w-[36%]">
                <div className="gambar-produk w-full h-full border-2 border-third rounded-[48px]">
                    <AdvancedImage cldImg={cloudSDK.image(product.image)}/>
                </div>
            </div>
            <div className="tulisan flex flex-col gap-y-4 w-[60%]">
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