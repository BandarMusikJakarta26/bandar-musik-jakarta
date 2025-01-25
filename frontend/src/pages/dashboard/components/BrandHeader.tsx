import ButtonShowBrands from "./ButtonShowBrands";

export default function BrandHeader(){
    return (
        <>
        <div className="brand-text flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center md:block">
                <h1 className="text-[26px] md:text-[36px] uppercase font-light italic tracking-tight text-center">Cari Sesuai</h1>
                <h1 className="text-[60px] md:text-[80px] font-black tracking-tighter -mt-[24px] md:-mt-[30px] text-center font-bree-serif">Brand</h1>
            </div>
            <ButtonShowBrands/>
        </div>
        <div className="brand-line w-full bg-third py-[1px]"></div>
        </>
    )
}