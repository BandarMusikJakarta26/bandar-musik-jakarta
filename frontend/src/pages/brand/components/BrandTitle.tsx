import { host } from "../../../../libs/config";

export default function BrandTitle({ brand }: any){

    return (
        <div className="brand">
            <div className="atas grid md:grid-cols-[2fr_3fr] items-center gap-x-6">
                <div className="gambar-brand px-10 md:px-20">
                    <img src={`${host}/storage/${brand.image}`} alt={brand.name}/>
                </div>
                <div className="tulisan">
                    <div className="tulisan-atas">
                        <h1 className="text-[20px] md:text-[64px] font-semibold md:font-bold text-center md:text-left -mt-[8px] tracking-tight">{brand.name}</h1>
                    </div>
                    <p className="text-center md:text-justify text-[14px] md:text-[20px] mt-2 md:mt-0 italic md:inline ">"{brand.description}"
                    </p>
                </div>
            </div>
        </div>
    )
}