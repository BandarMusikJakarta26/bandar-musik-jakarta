import { AdvancedImage } from "@cloudinary/react"
import { cloudSDK } from "../../libs/config"
import { useEffect, useState } from "react"
import responsivePage from "../action/screen.action"

function DesktopUI({ products }: { products: any[] }){
    return products.map((product, index)=>{
        return (
            <a className="group card shadow-xl p-6 relative flex flex-col gap-y-3 bg-white rounded-2xl"key={index} href={`/produk/${product.name}`}>
                <div className="gambar rounded-full scale-100 group-hover:bg-[#fafafa] group-hover:scale-[1.03] transition-all">
                    <div className="md:w-[320px] group-hover:scale-[1.03] transition">
                        <AdvancedImage cldImg={cloudSDK.image(product.image)}/>
                    </div>
                </div>
                <div className="name-product text-center md:text-left">
                    <h1 className="text-[20px] md:text-[22px] font-bold md:font-extrabold mb-1 md:mb-0 text-center">{product.name}</h1>
                    <p className="text-[14px] md:text-[18px] font-normal md:opacity-60 mt-[-8px] text-center">{product.categoryName}</p>
                </div>
                <div className="lihat flex justify-center items-center">
                    <p className="text-center underline">Lihat Detail</p>
                </div>
                {/* <div className="harga grid grid-cols-3 gap-x-3">
                    <div className="pricelist">
                        <p className="text-center text-[14px] mb-[-6px] opacity-80">Pricelist</p>
                        <p className="mt-2 font-semibold text-center tracking-tight border-2 border-third rounded-2xl hover:bg-third hover:text-primary transition-all">{product.harga}</p>
                    </div>
                    <div className="pricelist">
                        <p className="text-center text-[14px] mb-[-6px] opacity-80">MAP</p>
                        <p className="mt-2 font-semibold text-center tracking-tight border-2 border-third rounded-2xl hover:bg-third hover:text-primary transition-all">{product.harga}</p>
                    </div>
                    <div className="pricelist">
                        <p className="text-center text-[14px] mb-[-6px] opacity-80">Offline</p>
                        <p className="mt-2 font-semibold text-center tracking-tight border-2 border-third rounded-2xl hover:bg-third hover:text-primary transition-all">{product.harga}</p>
                    </div>
                 
                </div> */}
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
                    <div className="harga grid grid-cols-3 gap-x-10 mt-2">
                    <div className="pricelist">
                        <p className="text-left text-[12px] mb-[-6px] opacity-80">Pricelist</p>
                        <p className="mt-2 font-semibold tracking-tight text-[13px]">{product.harga}</p>
                    </div>
                    <div className="pricelist">
                        <p className="text-left text-[12px] mb-[-6px] opacity-80">Pricelist</p>
                        <p className="mt-2 font-semibold tracking-tight text-[13px]">{product.harga}</p>
                    </div>
                    <div className="pricelist">
                        <p className="text-left text-[12px] mb-[-6px] opacity-80">Pricelist</p>
                        <p className="mt-2 font-semibold tracking-tight text-[13px]">{product.harga}</p>
                    </div>
                 
                 
                </div>
                </div>
            
            </a>
        )
    })
}

export default function ShowAllProducts({ products, according }: { products: any[], according: string }){
    const [ screen, setScreen ] = useState<number>(window.innerWidth)
    console.log(according)
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