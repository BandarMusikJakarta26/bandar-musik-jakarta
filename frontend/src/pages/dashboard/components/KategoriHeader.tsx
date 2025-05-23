export default function KategoriHeader(){
    return (
        <>
        <div className="kategori-text flex flex-col items-center md:block">
            <h1 className="text-[26px] md:text-[36px] font-light italic tracking-tight text-right relative top-4 right-8">Sesuai</h1>
            <h1 className="text-[60px] md:text-[80px] font-black tracking-tight -mt-[24px] md:-mt-[30px] text-right font-bree-serif">Kategori</h1>
        </div>
        <div className="kategori-line w-full bg-third py-[1px]"></div>
        </>
    )
}