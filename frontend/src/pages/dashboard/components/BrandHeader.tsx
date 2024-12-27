export default function BrandHeader(){
    return (
        <>
        <div className="brand-text flex flex-col items-center md:block">
            <h1 className="text-[26px] md:text-[36px] uppercase font-light italic tracking-tight">Cari Sesuai</h1>
            <h1 className="text-[60px] md:text-[72px] uppercase font-black tracking-tight -mt-[24px] md:-mt-[30px]">Brand</h1>
        </div>
        <div className="brand-line w-full bg-third py-[1px]"></div>
        </>
    )
}