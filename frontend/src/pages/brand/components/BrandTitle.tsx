import { host } from "../../../../libs/config";

export default function BrandTitle({ brand }: any){

    return (
        <div className="brand">
            <div className="atas flex flex-col md:flex-row items-center gap-x-6">
                <div className="gambar-brand px-10 md:px-0">
                    <img src={`${host}/storage/${brand.image}`} alt={brand.name}/>
                </div>
                <div className="tulisan">
                    <div className="tulisan-atas">
                        <h1 className="text-[20px] md:text-[48px] font-semibold md:font-bold text-center md:text-left -mt-[24px]">{brand.name}</h1>
                    </div>
                    <p className="text-justify text-[14px] md:text-[16px] mt-2 md:mt-0">{brand.description}
                    </p>
                </div>
            </div>
        </div>
    )
}