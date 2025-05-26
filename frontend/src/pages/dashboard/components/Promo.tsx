import { LuCircleArrowRight } from "react-icons/lu";
import { RiDiscountPercentFill } from "react-icons/ri";
import { IPromo, promos } from "../../../../libs/store";

// import banner from '/utils/Slide1.png'

export default function Promo(){
    const headlinePromo = promos as IPromo[]

    function PromoBanner(){
        return headlinePromo.map((promo, index)=>{
            return (
                <h1 key={index} className="bg-purple-500 p-16 rounded-2xl">{promo.title}</h1>
            )
        })
    }

    return (
        <div className="main md:grid grid-cols-[2.5fr_1.5fr] gap-x-10 mt-10 md:mt-28 items-center">

            <div className="koleksi-promo grid grid-cols-1 gap-y-4 rotate-45 md:rotate-0 scale-75 md:scale-100">

            <div className="grid grid-cols-2 gap-6">
                <PromoBanner/>
            </div>
            {/* <div className="promo grid grid-cols-2 md:grid-cols-[2fr_1fr] gap-x-3 md:gap-x-4 md:mr-10">
                <a href="/promo" className="bg-white h-[140px] md:h-60 rounded-3xl hover:brightness-75 transition-all overflow-hidden relative">
                </a>
                <a href="/promo" className="bg-white h-[140px] md:h-60 rounded-3xl hover:brightness-75 transition-all overflow-hidden relative">
                </a>
            </div>

            <div className="promo grid grid-cols-2 md:grid-cols-[1fr_2fr] gap-x-4 md:ml-10">
                <a href="/promo" className="bg-white h-[140px] md:h-60 rounded-3xl hover:brightness-75 transition-all overflow-hidden">
                </a>
                <a href="/promo" className="bg-white h-[140px] md:h-60 rounded-3xl hover:brightness-75 transition-all overflow-hidden hidden md:block">
                </a>
            </div> */}

            <RiDiscountPercentFill size={60} className="text-second absolute bottom-20 right-20 -rotate-45 opacity-100 md:opacity-0"/>

            </div>
              
            <div className="text-promo flex flex-col h-full justify-center relative md:overflow-hidden">
                <h1 className="text-[52px] md:text-[80px] font-extrabold tracking-tight font-bree-serif text-center md:text-left -mt-[90px] md:mt-0">Best Price</h1>
                <p className="mt-[-14px] md:mt-[-20px] text-center md:text-left md:indent-8 md:text-[18px]">Nantikan setiap promo menarik hanya di</p>
                <a href="/" className="font-semibold underline italic md:text-[18px] md:indent-12 text-center md:text-left">Bandar Musik Jakarta.</a>
                <a href="/promo" className="md:text-[20px] px-4 md:px-6 py-1 md:py-2 border-2 border-third mt-4 flex items-center gap-x-2 group hover:bg-third hover:text-primary hover:rounded-r-3xl transition-all self-center md:self-auto md:w-[210px] md:ml-[64px]">
                    Lihat promo
                    <LuCircleArrowRight size={26} className="text-third mt-[2px] group-hover:translate-x-5 group-hover:text-primary transition-all"/>
                </a>
                <div className="circle bg-second rounded-full h-[200px] w-[200px] opacity-0 md:opacity-100 md:absolute right-[-100px] bottom-[-100px]"></div>
            </div>
        </div>
    )
}