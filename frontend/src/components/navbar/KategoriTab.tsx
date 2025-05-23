import { useEffect, useState } from "react"
import { getCategories, sortParentCategories, sortSubParentCategories } from "../../action/kategori.action"
// import { host } from "../../../libs/config"
import { FaChevronRight } from "react-icons/fa";
import { host } from "../../../libs/config";

export default function KategoriTab(){
    const [ categories, setCategories ] = useState<any[] | any>([])
    const [ parents, setParents] = useState<any[]>([])
    const [ subparents, setSubParents] = useState<any[]>([])
    const [ categoryActive, setCategoryActive ] = useState<any>(null)

    useEffect(()=>{ getCategories(setCategories) }, [])
    useEffect(()=>{ sortParentCategories(categories, setParents) }, [categories])
    useEffect(()=>{ sortSubParentCategories(categories, setSubParents) }, [categories])

    return (
        <div className={`absolute w-4/5 top-[108px] left-[10%] bg-primary grid grid-cols-[2fr_5fr] rounded-b-3xl border-[1px] border-gray-300 z-20 overflow-hidden`}>
        <div className="parent-tab flex flex-col border-r-[1px] border-r-gray-300">
            { parents.filter(parent=>parent!=="Semua").map((parent)=>{
                return <button className={`py-3 px-12 border-b-[1px] border-gray-300 w-full text-left text-[14px] hover:bg-second hover:font-bold hover:border-gray-500 transition-all justify-between flex group`} onMouseEnter={()=>setCategoryActive(parent)}>
                    {parent}
                    <FaChevronRight size={18} className="text-third translate-x-[-20px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition duration-500"/>
                </button>
            }) }
        </div>
        <div className={`isian px-10 py-6 flex flex-col gap-y-1`}>
            <h1 className="text-[28px] font-bold tracking-tight">{ categoryActive ? categoryActive : "Kategori" }</h1>

            <div className="kotak-kategori grid grid-rows-2">
                {categories && categories.length > 0 ? 
                    <div className="kategori-isian grid grid-cols-4 gap-x-5">
                        { categoryActive ? subparents.map((sub)=>{
                            const splitCategory = categoryActive.split(' ')
                            return splitCategory.map((split: string)=>{
                                if(sub.includes(split.split(' '))){
                                    return (
                                            <div className="row-sub flex flex-col border-r-[1px] border-gray-300 gap-y-2">
                                                <p className="text-[18px] font-semibold">{sub.split(' ')[0].split('-').join(' ')}</p>
                                                <div className="isi-sub flex flex-col gap-y-[6px]">
                                                { categories.map((kategori: any)=>{
                                                    if(kategori.subparent == sub) return <a href={`/kategori/${kategori.title}`} className="text-[14px] hover:translate-x-2 opacity-70 hover:opacity-100 hover:italic transition duration-500 font-normal">{kategori.title}</a>
                                                }) }
                                                </div>
                                            </div>
                                    )
                                }
                            })
                        }) : false}
                    </div>
                : false}
            </div>
            <div className="kategori-satuan grid grid-cols-5">
            {categories && categories.length > 0 ? categories.map((kategori: any)=>{
                                if((kategori.parent && kategori.parent == categoryActive) && !kategori.subparent){
                                    return (
                                        <a href={`/kategori/${kategori.title}`} className="group border-[1px] border-gray-200 hover:border-gray-500 transition duration-500">
                                            <img src={`${host}/storage/${kategori.image}`} alt={kategori.title} />
                                        </a>
                                    )
                                }
                                else if(!categoryActive){
                                    return (
                                        <a href={`/kategori/${kategori.title}`} className="text-[14px] hover:translate-x-2 opacity-70 hover:opacity-100 hover:italic transition duration-500 font-normal my-1">{kategori.title}</a>
                                    )
                                }
            }): false}
            </div>

        </div>
        </div>
    )
}