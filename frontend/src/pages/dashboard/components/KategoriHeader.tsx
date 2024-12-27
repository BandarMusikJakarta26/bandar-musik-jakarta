export default function KategoriHeader(){
    return (
        <>
        <div className="kategori-text flex flex-col items-center md:block">
            <h1 className="text-[26px] md:text-[36px] uppercase font-light italic tracking-tight text-right">Berdasarkan</h1>
            <h1 className="text-[60px] md:text-[72px] uppercase font-black tracking-tight -mt-[24px] md:-mt-[30px] text-right">Kategori</h1>
        </div>
        <div className="kategori-line w-full bg-third py-[1px]"></div>
        </>
    )
}