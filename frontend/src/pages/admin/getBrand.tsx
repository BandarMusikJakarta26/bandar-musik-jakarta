import React, { useEffect, useState } from "react"
import { host } from '../../../libs/config'
import { FaRegPlusSquare } from "react-icons/fa";
import responsivePage from "../../action/screen.action";
import { deleteBrand, getBrands } from "../../action/brand.action";

const GetBrand = function(){

    const [ brands, setBrands ] = useState<any[]>([])
    const [ screen, setScreen ] = useState<number>(window.innerWidth)

    useEffect(()=>{
        async function brandFetch(){ await getBrands(setBrands) }
        brandFetch()
        responsivePage(setScreen)
    }, [])

    function BrandKosong(){
        return (
            <div className="kosong w-full h-[70vh] flex flex-col items-center justify-center shadow-xl p-16">
                <h1 className="text-[80px] font-bold tracking-tighter uppercase">Belum ada brand</h1>
                <a href="/admin/tambah/brand" className="underline text-[22px]">Tambah brand?</a>
            </div>
        )
    }

    async function deleteBrandByName(name : string){
        const response = await deleteBrand(name)
        if(!response) return true
        return await getBrands(setBrands)
    }   

    function DataBrand(){
        function ShowBrand(){ 
            return brands.map((brand, index)=>{
            return (
                <a className="brandfield flex flex-col border-[1px] border-gray-300 items-center group" key={index+1} href={`/brand/${brand.name}`}>
                    <div className="gambar md:px-8 px-3 pt-2 md:pt-0 group-hover:scale-110 transition-all">
                        <img src={`${host}/storage/${brand.image}`} alt="" />
                    </div>
                    <div className="nama-brand p-4 md:p-5 flex flex-col items-center gap-y-2">
                        <h1 className="md:text-[15px] text-[11px] text-center font-semibold">{brand.name}</h1>
                        <button className="bg-red-600 text-primary font-semibold rounded-full py-[1px] hover:brightness-90 w-[54px] md:w-[70px] text-[10px] md:text-[12px]" onClick={()=>deleteBrandByName(brand.name)}>Delete</button>
                    </div>
                </a>
                )
            })
        }

        return (
            <>  
                <div className="headbrand flex justify-between">
                    <h1 className="text-[30px] md:text-[50px] font-bold tracking-tight">Daftar Brand</h1>
                </div>
                <div className="showbrand grid grid-cols-3 md:grid-cols-6">
                    <ShowBrand/>
                    <a href="/admin/tambah/brand" className="opacity-80 hover:opacity-100 transition-all self-center justify-self-center"><FaRegPlusSquare size={ screen <= 768 ? 70 : 150 }/></a>
                </div>
            </>
        )
    }
   
    return (
        <div className="w-full box-border py-[80px] px-5 md:p-10">
            <div className="brandList w-full">
                { !brands ? <BrandKosong/> : <DataBrand/> }
            </div>
        </div>
    )
}

export default React.memo(GetBrand)