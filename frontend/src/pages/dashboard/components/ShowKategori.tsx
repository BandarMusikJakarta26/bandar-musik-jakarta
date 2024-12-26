import { AdvancedImage } from "@cloudinary/react"
import { cloudSDK } from "../../../../libs/config"

export function ShowKategori({category}: { category: any }){
    return (
        <a className='w-full drop-shadow-xl flex justify-center' href={`/kategori/${category.name}`}>
            <AdvancedImage cldImg={cloudSDK.image(category.image)}/>
        </a>
        // <a className='w-full h-[260px] drop-shadow-xl' href={`/kategori/${category.name}`}>
        //     <AdvancedImage cldImg={cloudSDK.image(category.image)}/>
        // </a>
    )
}