import axios, { AxiosResponse } from "axios"
import { host } from "../../../../libs/config"
import { useEffect, useState } from "react"

export default function Brand(){
    const [ brands, setBrands ] = useState<any[]>([])

    async function BrandFetch(){
        const response = await axios.get(`${host}/admin/brand/20`) as AxiosResponse
        return setBrands(response.data.brands)
    }

    useEffect(()=>{ BrandFetch() }, [])

    function ShowBrands(){
        return brands.map((brand: { name: string, image: string }, index: number)=>{
            return (
                <div className="gambar-brand w-full h-[100px] flex items-center justify-center opacity-50 hover:opacity-100 transition-all hover:scale-105" key={index}>
                <a href={`/brand/${brand.name}`}><img src={`${host}/images/brand/${brand.image}`} width={180} height={100} alt={brand.name}/></a>
                </div>
            )
        })
    }

    return (
        <div className="brand mt-[70px]">
            <div className="brand-text">
                <h1 className="text-[36px] uppercase font-light italic tracking-tight">Cari Sesuai</h1>
                <h1 className="text-[72px] uppercase font-black tracking-tight -mt-[30px]">Brand</h1>
            </div>
            <div className="brand-line w-full bg-third py-[1px]"></div>
            <div className="brand-list grid grid-cols-10 gap-8">
                { brands && brands.length != 0 ? <ShowBrands/> : false } 
            </div>
            <div className="brand-line w-full bg-third py-[1px] mt-4"></div>
            <div className="semua-brand mt-8 flex justify-center">
                <a href={`/brand`} className="text-[24px] border-2 border-third px-10 py-2 hover:bg-third hover:text-primary transition-all">Lihat Semua Brand</a>                
            </div>
        </div>
    )
}