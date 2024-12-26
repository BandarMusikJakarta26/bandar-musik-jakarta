import { AdvancedImage } from "@cloudinary/react"
import { cloudSDK } from "../../libs/config"

export default function ShowAllProducts({ products, according }: { products: any[], according: string }){
    return products.map((product, index)=>{
        return (
            <a className="group card shadow-xl p-6 relative flex flex-col gap-y-3"key={index} href={product.tokopedia} target="_blank">
                <div className="name-product">
                    <h1 className="text-[32px] font-extrabold">{product.categoryName}</h1>
                    <p className="text-[16px] font-semibold opacity-60 mt-[-8px]">{product.name}</p>
                </div>
                <div className="gambar rounded-full scale-100 group-hover:bg-[#fafafa] group-hover:scale-[1.03] transition-all">
                    <div className="w-[300px] group-hover:scale-[1.03] transition">
                        <AdvancedImage cldImg={cloudSDK.image(product.image)}/>
                    </div>
                </div>
                <p className="text-[28px] font-extrabold text-center tracking-tight">{product.harga}</p>
            </a>
        )
    })
}