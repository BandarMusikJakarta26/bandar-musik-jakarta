import { AdvancedImage } from "@cloudinary/react";
import { cloudSDK } from "../../../../libs/config";

export default function BrandTitle({ brand }: any){
    return (
        <div className="brand">
            <div className="atas flex flex-col md:flex-row items-center gap-x-6">
                <AdvancedImage cldImg={cloudSDK.image(brand.image)}/>
                <div className="tulisan">
                    <div className="tulisan-atas">
                        <h1 className="text-[24px] md:text-[48px] font-semibold md:font-bold text-center md:text-left -mt-[24px]">{brand.name}</h1>
                    </div>
                    <p className="text-justify text-[14px] md:text-[16px]">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia, sapiente quisquam modi quos ipsa perferendis libero natus reprehenderit enim expedita est temporibus perspiciatis fugit fugiat aut hic? Amet, temporibus quaerat.
                    </p>
                </div>
            </div>
        </div>
    )
}