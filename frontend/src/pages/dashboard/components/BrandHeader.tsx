import ButtonShowBrands from "./ButtonShowBrands";

export default function BrandHeader(){
    return (
        <>
        <div className="brand-text flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center md:block mb-4 md:mb-0">
                <h1 className="text-[26px] md:text-[36px] font-light italic tracking-tight text-center relative md:top-[22px] top-[15px] left-[3px] md:left-[-10px]">Cari</h1>
                <h1 className="text-[60px] md:text-[80px] font-black tracking-tighter -mt-[24px] md:-mt-[30px] text-center font-bree-serif">Brand</h1>
            </div>
            <ButtonShowBrands/>
        </div>
        <div className="brand-line w-full bg-third py-[1px]"></div>
        </>
    )
}