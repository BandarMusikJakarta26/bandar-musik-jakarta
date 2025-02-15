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
                <div className="brandfield flex flex-col shadow-lg items-center" key={index+1}>
                    <div className="gambar md:p-0 p-3">
                        <img src={`${host}/storage/${brand.image}`} alt="" />
                    </div>
                    <div className="nama-brand p-4 md:p-5 flex flex-col items-center gap-y-2">
                        <h1 className="md:text-[24px] font-semibold">{brand.name}</h1>
                        <button className="bg-red-600 text-primary font-semibold rounded-full py-[2px] md:py-1 hover:brightness-90 w-[60px] md:w-[70px] text-[10px] md:text-[14px]" onClick={()=>deleteBrandByName(brand.name)}>Delete</button>
                    </div>
                </div>
                )
            })
        }

        return (
            <>  
                <div className="headbrand flex justify-between">
                    <h1 className="text-[30px] md:text-[50px] font-bold tracking-tight">Daftar Brand</h1>
                </div>
                <div className="showbrand grid grid-cols-3 md:grid-cols-5 gap-x-4 md:gap-x-8 gap-y-6 ">
                    <ShowBrand/>
                    <a href="/admin/tambah/brand" className="opacity-80 hover:opacity-100 transition-all self-center justify-self-center"><FaRegPlusSquare size={ screen <= 768 ? 70 : 260 }/></a>
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