import SosmedInformation from "./SosmedInformation";
import ShopInformation from "./ShopInformation";
import LogoFooter from "./LogoFooter";
import TautanLayout from "./TautanLayout";
import ShowPageList from "./ShowPageList";
import CopyrightPage from "./CopyrightPage";
import { getBrandsWithLimit } from "../../../action/brand.action";
import { getCategoriesWithLimit } from "../../../action/kategori.action";
import { useEffect, useState } from "react";

export default function MainFooter(){
    const [ brands, setBrands ] = useState<any[]>([])
    const [ categories, setCategories ] = useState<any[]>([])

    useEffect(()=>{
        getCategoriesWithLimit(categories, setCategories) 
        getBrandsWithLimit(brands, setBrands, 30)
    }, [])

    return (
        <div className="w-full bg-third py-12 px-[36px] md:px-[160px] text-primary mt-20 flex flex-col relative z-10">
            <div className="footer-top w-full h-full flex flex-col gap-y-2 md:grid md:grid-cols-3 md:gap-x-4 items-center justify-between">
                <LogoFooter/>
                <ShopInformation/>
                <SosmedInformation/>
            </div>
            <div className="tautan gap-x-2 md:gap-x-8 grid grid-cols-2 mt-8 md:mt-16">
                <TautanLayout title={'Brand'}>
                    <ShowPageList page={'brand'} data={brands}/>
                </TautanLayout>
                <TautanLayout title={'Kategori'}>
                    <ShowPageList page={'kategori'} data={categories}/>
                </TautanLayout>        
            </div>
            <CopyrightPage/>
        </div>
    )
}