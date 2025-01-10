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
                <AdvancedImage cldImg={cloudSDK.image(image)} className="md:h-[100px]"/>
            </div>
        })
    }

    if(!product) return false
    else return (
        <div className="main w-full md:flex justify-between mt-10 md:mt-6 md:py-20 px-10 relative">
            <div className="area-gambar w-full md:w-[34%] relative z-10">

            <div className="gambar h-auto px-10 mb-3">
                <div className="group gambar-produk w-full h-full">
                    {product.images.length > 0 ? <AdvancedImage cldImg={cloudSDK.image(active ? active : product.images[0])} className="group-hover:scale-125 md:group-hover:scale-150 group-hover:cursor-grab transition-all"/> : <h1>{product.name}</h1>}
                </div>
            </div>
            <div className={`gambarmini grid grid-cols-4 gap-x-2 px-10 mt-[-24px]`}>
                <ShowMiniImages productImages={product.images}/>
            </div>

            </div>

            <div className="gambar h-[100px] w-[100px] md:h-[240px] md:w-[240px] md:p-10 bg-second absolute z-0 top-[18px] left-[130px] md:top-[180px] md:left-[180px] rounded-full"></div>
            <div className="tulisan flex flex-col gap-y-4 w-full md:w-[60%] mt-10 md:mt-0">
                <div className="brandName flex">
                    <div className="brand w-full flex md:block justify-center">
                        <p className="font-semibold text-[12px] md:text-[16px] mb-[] md:mb-[-20px] underline">
                            <a className="opacity-60 hover:opacity-100" href={`/kategori/${product.categoryName}`}>{product.categoryName} </a>
                            <a className="opacity-60 hover:opacity-100" href={`/brand/${product.brandName}`}>/ {product.brandName}</a>
                        </p>
                    </div>
                </div>
                <h1 className="text-[22px] md:text-[45px] font-bold mt-5 md:mt-0">{product.name}</h1>
                <p className="font-bold opacity-70 text-[14px] md:text-[16px]">Deskripsi Produk</p>
                <div className="garis h-[2px] w-[115px] md:w-[130px] bg-third rounded-full mt-[-8px]"></div>
                <p className="text-[12px] md:text-[14px] text-justify mt-[-12px]">{product.deskripsi}</p>
                <div className="pembelian flex flex-col md:flex-row justify-between w-full mt-2">
                    <div className="harga">
                        <p className="text-[30px] text-center md:text-left md:text-[36px] font-bold tracking-tight">{product.diskon}</p>
                        <p className="text-[18px] text-center md:text-left md:text-[16px] font-medium text-red-800"><span className="line-through">{product.harga}</span> Diskon</p>
                    </div>
                    <a href={product.tokopedia} className="py-2 px-8 bg-green-600 text-primary self-center flex items-center gap-x-2 rounded-3xl mt-4 md:mt-0 text-[14px] md:text-[16px]" target="_blank"><RiShoppingBagLine size={20}/>Beli Barang</a>
                </div>
            </div>
        </div>
    )
}