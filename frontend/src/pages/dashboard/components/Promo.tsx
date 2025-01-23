import { LuCircleArrowRight } from "react-icons/lu";
// import banner from '/utils/Slide1.png'

export default function Promo(){
    return (
        <div className="main grid grid-cols-[2.5fr_1.5fr] gap-x-10 mt-28 items-center">

            <div className="koleksi-promo grid grid-cols-1 gap-y-4">

            <div className="promo grid grid-cols-[2fr_1fr] gap-x-4 mr-10">
                <a href="/promo" className="bg-white h-60 rounded-3xl hover:brightness-75 transition-all overflow-hidden relative">
                </a>
                <a href="/promo" className="bg-white h-60 rounded-3xl hover:brightness-75 transition-all overflow-hidden relative">
                </a>
            </div>
            <div className="promo grid grid-cols-[1fr_2fr] gap-x-4 ml-10">
                <a href="/promo" className="bg-white h-60 rounded-3xl hover:brightness-75 transition-all overflow-hidden">
                </a>
                <a href="/promo" className="bg-white h-60 rounded-3xl hover:brightness-75 transition-all overflow-hidden">
                </a>
            </div>

            </div>
              
            <div className="text-promo flex flex-col h-full justify-center relative overflow-hidden">
                <h1 className="text-[80px] font-extrabold tracking-tight font-bree-serif">Best Price</h1>
                <p className="text-[20px] mt-[-20px] indent-8">Nantikan tiap promo menarik hanya di <a href="/" className="font-semibold underline italic">Bandar Musik Jakarta</a>.</p>
                <a href="/promo" className="text-[20px] px-6 py-2 border-2 border-third mt-4 w-[210px] ml-14 flex items-center gap-x-2 group hover:bg-third hover:text-primary   hover:rounded-r-3xl transition-all">
                    Lihat promo
                    <LuCircleArrowRight size={26} className="text-third mt-[2px] group-hover:translate-x-5 group-hover:text-primary transition-all"/>
                </a>
                <div className="circle bg-second rounded-full h-[200px] w-[200px] absolute right-[-100px] bottom-[-100px]"></div>
            </div>
        </div>
    )
}