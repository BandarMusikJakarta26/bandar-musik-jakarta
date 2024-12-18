import KategoriSlides from "./KategoriSlides";

export default function Kategori(){
    return (
        <div className="kategori mt-[70px]">
            <div className="kategori-text">
                <h1 className="text-[36px] uppercase font-light italic tracking-tight text-right">Berdasarkan</h1>
                <h1 className="text-[72px] uppercase font-black tracking-tight -mt-[30px] text-right">Kategori</h1>
            </div>
            <div className="kategori-line w-full bg-third py-[1px]"></div>
            <KategoriSlides/>
        </div>
    )
}