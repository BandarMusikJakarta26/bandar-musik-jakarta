import { useEffect, useState } from "react"
import { BiSolidChevronRight } from "react-icons/bi"
import { host } from "../../../libs/config"
import { sortParentCategories } from "../../action/kategori.action"

function ShowParents({ parents, categories, categoryActive, setCategoryActive }: { parents: any, categories: any, categoryActive: any, setCategoryActive: any }){
    // const [ componentActive, setComponentActive ] = useState<boolean>(false)

    
    useEffect(()=>{
        // addEventListener('mousemove', (e: any)=>{
        //     const selected = document.querySelector('.category')
        //     const tombol = document.querySelector('.tombol')
            
        // })
    }, [])

    return parents.length > 0 && parents.map((parent: any)=>{
        return (
            <p className={`tombol border-[1px] border-b-third  border-gray-200 px-5 md:px-6 py-3 cursor-pointer flex justify-between items-center ${(categoryActive && categoryActive.parent == parent) || (!categoryActive && parent == "Semua")  ? 'border-third pl-10 bg-gradient-to-l from-primary to-second font-semibold md:text-[20px]' : 'bg-primary'} hover:pl-10 hover:bg-[#fafafa] transition-all text-[12px]`} onMouseEnter={()=>{
                    if(parent == "Semua"){ return setCategoryActive(null) }
                    else categories.forEach((category: any)=>{
                        return category.parent == parent && setCategoryActive(category)
                    })
                }
            } ><span>{parent}</span>
            {!categoryActive && parent == "Semua" ? <BiSolidChevronRight size={40} className={`text-third transition duration-500`}/> : false}
            {categoryActive && <BiSolidChevronRight size={40} className={`text-third ${(categoryActive.parent == parent)? 'opacity-100' : 'opacity-0'} transition duration-500`}/>}
            </p>
        )
    }) 
}

export default function MainKategori({ categories }: { categories: any[] }){
    const [parents, setParents] = useState<any[]>([])
    const [ categoryActive, setCategoryActive ] = useState<any>(null)

    useEffect(()=>{ sortParentCategories(categories, setParents) }, [])
   
    function CategoryComponent({ category, index }: { category: any, index: number }){
        return (
                <a className="hover:shadow-md hover:hue-rotate-60 transition duration-700 overflow-hidden border-2 border-gray-200" href={`/kategori/${category.title}`} key={index}>
                    <img src={`${host}/storage/${category.image}`} alt={category.title} className='w-full'/>
                </a>
        )
}


function CategorySection({ parents }: { parents: any[] }){
    function ShowSubCategory({categories, parent} : { categories: any[], parent: string }){
        return categories.map((category, index)=>{
                if(parent && category.parent == parent){
                    return (
                        <CategoryComponent category={category} index={index}/>
                    )
                }
        }) 
    }

    return parents.map((parent, index)=>{
            if(parent !== "Semua")return (
                <>
                    <div className={` bg-gray-100 flex flex-col md:gap-y-4 p-6 md:p-10 rounded-3xl ml-5 md:ml-10 
                        ${categoryActive && categoryActive.parent == parent ? 'visible' : !categoryActive ? 'visible' : 'hidden' }
                    `} key={index}>
                    <div className="header">
                        <h1 className='text-[40px] font-bold tracking-tight text-third'>{parent && parent}</h1>
                    </div>
                    <div className="w-full grid md:grid-cols-3 gap-4">
                        <ShowSubCategory categories={categories} parent={parent}/>
                    </div>
                    </div>
                </>
            )
    })
}

    return (
        <div className="root grid md:grid-cols-[1fr_3fr] mt-10">
                <div className="showParent grid grid-cols-2">
                    <ShowParents categories={categories} parents={parents} setCategoryActive={setCategoryActive} categoryActive={categoryActive}/>
                </div>
                <div className="category category-section flex flex-col gap-y-8 md:h-[700px] overflow-y-scroll">
                    <CategorySection parents={parents}/>
                </div>
        </div>
    )
}