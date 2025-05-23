import { LuCircleArrowRight } from "react-icons/lu";

export default function ButtonShowBrands(){
    return (
        <div className="semua-brand -mt-6 md:mt-8 flex justify-center mb-6 md:mb-0">
             <a href="/brand" className="text-[12px] md:text-[16px] px-4 md:px-6 py-1 md:py-1 border-[1px] border-third mt-1 md:ml-14 flex items-center gap-x-3 group hover:bg-third hover:text-primary hover:rounded-r-3xl transition-all">
                    Semua Brand
                <LuCircleArrowRight size={24} className="text-third mt-[2px] group-hover:translate-x-3 group-hover:text-primary transition-all"/>
            </a>               
        </div>
    )
}