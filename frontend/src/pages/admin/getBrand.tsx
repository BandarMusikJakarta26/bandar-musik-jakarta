import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { cloudSDK, host } from '../../../libs/config'
import { FaRegPlusSquare } from "react-icons/fa";
import { AdvancedImage } from "@cloudinary/react";

export default function GetBrand(){
    const [ brands, setBrand ] = useState<any[]>([])

    useEffect(()=>{
        async function brandFetch(){
            const response = await axios.get(`${host}/admin/brand`) as AxiosResponse
            response.data.brands.length > 0 ? setBrand(response.data.brands) : setBrand([])
        }
        brandFetch()
    }, [])

    function BrandKosong(){
        return (
            <div className="kosong w-full h-[70vh] flex flex-col items-center justify-center shadow-xl p-16">
                <h1 className="text-[80px] font-bold tracking-tighter uppercase">Belum ada brand</h1>
                <a href="/admin/tambah/brand" className="underline text-[22px]">Tambah brand?</a>
            </div>
        )
    }

    async function deleteBrand(id: string){
        const response = await axios.get(`${host}/admin/hapus/brand/${id}`)
        if(!response.data.success) return true
        setBrand(response.data.brands)
    }

    function DataBrand(){
        function ShowBrand(){ 
            return brands.map((brand, index)=>{
            return (
                <div className="brandfield flex flex-col shadow-lg items-center" key={index+1}>
                    <AdvancedImage cldImg={cloudSDK.image(brand.image)}/>
                    <div className="nama-brand p-5 flex flex-col items-center gap-y-2">
                        <h1 className="text-[24px] font-semibold">{brand.name}</h1>
                        <button className="bg-red-600 text-primary font-semibold rounded-full py-1 hover:brightness-90 w-[70px] text-[14px]" onClick={()=>deleteBrand(brand.id)}>Delete</button>
                    </div>
                </div>
                )
            })
        }

        return (
            <>  
                <div className="headbrand flex justify-between">
                    <h1 className="text-[50px] font-bold tracking-tight">Daftar Brand</h1>
                </div>
                <div className="showbrand grid grid-cols-5 gap-x-8 gap-y-6 ">
                    <ShowBrand/>
                    <a href="/admin/tambah/brand" className="opacity-80 hover:opacity-100 transition-all"><FaRegPlusSquare size={260}/></a>
                </div>
            </>
        )
    }

    return (
        <div className="w-full box-border p-10">
            <div className="brandList w-full pl-[80px]">
                { !brands ? <BrandKosong/> : <DataBrand/> }
            </div>
        </div>
    )
}