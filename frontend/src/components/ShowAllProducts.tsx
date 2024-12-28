import { AdvancedImage } from "@cloudinary/react"
import { cloudSDK } from "../../libs/config"
import { useEffect, useState } from "react"
import responsivePage from "../action/screen.action"

function DesktopUI({ products }: { products: any[] }){
    return products.map((product, index)=>{
        return (
            <a className="group card shadow-xl p-6 relative flex flex-col gap-y-3"key={index} href={product.tokopedia} target="_blank">
                <div className="name-product text-center md:text-left">
                    <h1 className="text-[20px] md:text-[32px] font-bold md:font-extrabold mb-1 md:mb-0">{product.name}</h1>
                    <p className="text-[14px] md:text-[16px] font-normal md:opacity-60 mt-[-8px]">{product.categoryName}</p>
                </div>
                <div className="gambar rounded-full scale-100 group-hover:bg-[#fafafa] group-hover:scale-[1.03] transition-all">
                    <div className="md:w-[300px] group-hover:scale-[1.03] transition">
                        <AdvancedImage cldImg={cloudSDK.image(product.image)}/>
                    </div>
                </div>
                <p className="mt-2 self-center text-[20px] md:text-[28px] font-semibold w-[160px] bg-second text-center tracking-tight">{product.harga}</p>
            </a>
        )
    })
}

function MobileUI({ products }: { products: any[] }){
    return products.map((product, index)=>{
        return (
            <a className="flex bg-[#fbfbfb] rounded-[16px] overflow-hidden items-center gap-x-3" key={index} href={product.tokopedia} target="_blank">
                <div className="gambar bg-[#dfdfdf] p-3">
                    <div className="w-[90px]">
                        <AdvancedImage cldImg={cloudSDK.image(product.image)}/>
                    </div>
                </div>
                <div className="py-3">
                    <h1 className="text-[16px] font-bold">{product.name}</h1>
                    <p className="text-[12px] font-normal opacity-70 -mt-[3px]">{product.categoryName}</p>
                    <p className="text-[15px]">{product.harga}</p>
                </div>
            
            </a>
        )
    })
}

export default function ShowAllProducts({ products, according }: { products: any[], according: string }){
    const [ screen, setScreen ] = useState<number>(window.innerWidth)
    
    useEffect(()=>{ responsivePage(setScreen) })

    if(screen <= 768 ) return (
        <>
        <div className="title-product flex px-6 justify-between items-center">
            <h1 className="text-[16px] font-bold">Products</h1>
            <p className="text-[12px]">Filter</p>
        </div>
        <MobileUI products={products}/>
        </>)
    else return <DesktopUI products={products}/>
}