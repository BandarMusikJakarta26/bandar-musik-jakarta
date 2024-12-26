import { useEffect, useState } from "react";
import { getBrands, getCategories } from "../../action/brand.action";

import SosmedInformation from "./components/SosmedInformation";
import ShopInformation from "./components/ShopInformation";
import LogoFooter from "./components/LogoFooter";
import TautanLayout from "./components/TautanLayout";
import ShowPageList from "./components/ShowPageList";
import CopyrightPage from "./components/CopyrightPage";

export default function Footer(){
    const [ brands, setBrands ] = useState<any[]>([])
    const [ categories, setCategories ] = useState<any[]>([])

    useEffect(()=>{
        getBrands(setBrands) 
        getCategories(setCategories) 
    }, [])

    return (
        <div className="w-full bg-third py-12 px-[160px] text-primary mt-20 flex flex-col">
            <div className="footer-top w-full h-full grid grid-cols-3 gap-x-4 items-center justify-between">
                <LogoFooter/>
                <ShopInformation/>
                <SosmedInformation/>
            </div>
            <div className="tautan gap-x-8 grid grid-cols-2 mt-16">
                <TautanLayout>
                    <ShowPageList page={'brand'} data={brands}/>
                </TautanLayout>
                <TautanLayout>
                    <ShowPageList page={'kategori'} data={categories}/>
                </TautanLayout>        
            </div>
            <CopyrightPage/>
        </div>
    )
}