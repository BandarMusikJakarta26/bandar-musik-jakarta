import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { cloudSDK, host } from '../../../libs/config'
import { FaRegPlusSquare } from "react-icons/fa";
import { AdvancedImage } from "@cloudinary/react";
import responsivePage from "../../action/screen.action";
import { checkAdmin } from "../../action/auth.action";
import BlankPage from "../blank";

export default function GetCategory(){
    const [ admin, isAdmin ] = useState<boolean>(false) 
    async function adminValidation() { return await isAdmin(await checkAdmin()) }
    adminValidation()

    const [ categories, setCategory ] = useState<any[]>([])
    const [ screen, setScreen ] = useState<number>(window.innerWidth)

    useEffect(()=>{
        async function getCategories(){
            const response = await axios.get(`${host}/admin/kategori`) as AxiosResponse
            response.data.categories.length > 0 ? setCategory(response.data.categories) : setCategory([])
        }
        getCategories()
    }, [])

    function CategoryKosong(){
        return (
            <div className="kosong w-full h-[70vh] flex flex-col items-center justify-center shadow-xl p-16">
                <h1 className="text-[80px] font-bold tracking-tighter uppercase">Belum ada kategori</h1>
                <a href="/admin/tambah/kategori" className="underline text-[22px]">Tambah Kategori?</a>
            </div>
        )
    }

    async function deleteCategory(id: string){
        const response = await axios.get(`${host}/admin/hapus/kategori/${id}`)
        if(!response.data.success) return true
        setCategory(response.data.brands)
        responsivePage(setScreen)
    }

    function DataCategory(){
        function ShowCategory(){ 
            return categories.map((category, index)=>{
            return (
                <div className="brandfield flex flex-col shadow-lg items-center" key={index+1}>
                    <AdvancedImage cldImg={cloudSDK.image(category.image)}/>
                    <div className="nama-brand p-5 flex flex-col items-center gap-y-2">
                        <h1 className="text-[13px] md:text-[24px] font-semibold">{category.name}</h1>
                        <button className="bg-red-600 text-primary font-semibold rounded-full py-[2px] md:py-1 hover:brightness-90 w-[60px] md:w-[70px] text-[10px] md:text-[14px]" onClick={()=>deleteCategory(category.id)}>Delete</button>
                    </div>
                </div>
                )
            })
        }

        return (
            <>  
                <div className="headbrand flex justify-between">
                    <h1 className="text-[28px] md:text-[50px] font-bold tracking-tight">Daftar Category</h1>
                </div>
                <div className="showbrand grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-6 items-center">
                    <ShowCategory/>
                    <a href="/admin/tambah/kategori" className="opacity-80 hover:opacity-100 justify-self-center transition-all"><FaRegPlusSquare size={ screen <= 768 ? 70 : 260 }/></a>
                </div>
            </>
        )
    }

    if(!admin) return <BlankPage/>
    else return (
        <div className="w-full box-border pt-12 px-5 md:p-10">
            <div className="brandList w-full">
                { categories.length == 0 ? <CategoryKosong/> : <DataCategory/> }
            </div>
        </div>
    )
}