import { LuCircleArrowRight } from "react-icons/lu";

import { useEffect, useState } from "react";
import responsivePage from "../../../action/screen.action";
import { getPromos } from "../../../action/promo.action";
import LoadingComponent from "../../../components/LoadingComponent";
import { IPromo } from "../../promo/PromoPage";
import { host } from "../../../../libs/config";

export default function Promo(){
    const [screen, setScreen] = useState<number>(window.innerWidth)
    const [promo, setPromo] = useState<any[]>([])

    useEffect(()=>{ 
        responsivePage(setScreen)
        getPromos(setPromo)
    }, [])

    console.log(screen)

    function PromoBanner({ promo }: { promo: IPromo[] }){
        return promo.map((p:IPromo, index: number)=>{
            return (
                <a key={index+1} className={`rounded-2xl overflow-hidden ${index == 0 && 'md:row-span-2'} transition duration-500 hover:brightness-50 group`} href={`promo/${p.title}`}>
                    <img src={`${host}/storage/${p.images[1]}`} alt={p.title} className={`rounded-2xl group-hover:blur-[2px]`}/>
                </a>
            )
        })
    }

    return (
        <div className="main md:grid grid-cols-[2.5fr_1.5fr] gap-x-10 md:mt-28 items-center">

            <div className="koleksi-promo grid grid-cols-1 gap-y-4">

            <div className="grid md:grid-cols-2 gap-4 md:mx-0 mx-8">
                {promo !== null && promo.length > 0 ? <PromoBanner promo={promo}/> : <LoadingComponent/>}
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

            {/* <RiDiscountPercentFill size={60} className="text-second absolute bottom-20 right-20 -rotate-45 opacity-100 md:opacity-0"/> */}

            </div>
              
            <div className="text-promo flex flex-col h-full justify-center relative md:overflow-hidden">
                <h1 className="text-[52px] md:text-[80px] font-extrabold tracking-tight font-bree-serif text-center md:text-left mt-[20px] md:mt-0">Best Price</h1>
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