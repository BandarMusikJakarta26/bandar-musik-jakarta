import { FaRegPlusSquare } from "react-icons/fa";
import ShowKategori from "./ShowKategori";
import { useEffect, useState } from "react";

export default function DataCategory({ categories, setCategories }: { categories: any, setCategories: any }){
    const [ screen, setScreen ] = useState<number>(window.innerWidth)

    useEffect(()=>{ setScreen(window.innerWidth)}, [])

    return (
        <>  
            <div className="headbrand flex justify-between">
                <h1 className="text-[28px] md:text-[50px] font-bold tracking-tight">Daftar Category</h1>
            </div>
            <div className="showbrand grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-0 gap-y-6 items-center">
                <ShowKategori categories={categories} setCategories={setCategories}/>
                <a href="/admin/tambah/kategori" className="opacity-80 hover:opacity-100 justify-self-center transition-all"><FaRegPlusSquare size={ screen <= 768 ? 70 : 180 }/></a>
            </div>
        </>
    )
}