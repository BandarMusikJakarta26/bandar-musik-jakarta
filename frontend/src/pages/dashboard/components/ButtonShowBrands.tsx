import { LuCircleArrowRight } from "react-icons/lu";

export default function ButtonShowBrands(){
    return (
        <div className="semua-brand mt-8 flex justify-center">
             <a href="/brand" className="text-[20px] px-6 py-2 border-2 border-third mt-4 w-[210px] ml-14 flex items-center gap-x-2 group hover:bg-third hover:text-primary   hover:rounded-r-3xl transition-all">
                    Semua Brand
                <LuCircleArrowRight size={26} className="text-third mt-[2px] group-hover:translate-x-3 group-hover:text-primary transition-all"/>
            </a>               
        </div>
    )
}