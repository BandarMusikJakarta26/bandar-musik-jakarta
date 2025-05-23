import { host } from "../../../../libs/config"
import { deleteCategory } from "../../../action/kategori.action"
import { FaEdit } from "react-icons/fa";

export default function ShowKategori({categories, setCategories}: { categories: any, setCategories: any }){ 
            return categories.map((category: any, index: number)=>{
            return (
                <div className="brandfield flex flex-col items-center relative" key={index+1}>
                    <a href={`/kategori/${category.title}`} className="hover:brightness-90 transition delay-100 duration-300 border-[1px] border-gray-300" ><img src={`${host}/storage/${category.image}`} alt={category.name} /></a>
                    <div className="nama-brand py-3 flex flex-col items-center gap-y-1">
                        <h1 className="text-[13px] md:text-[18px] font-semibold">{category.title}</h1>
                        <button className="bg-red-600 text-primary font-semibold rounded-full py-[2px] hover:brightness-90 w-[60px] md:w-[70px] text-[10px] md:text-[12px]" onClick={()=>deleteCategory(category.title, setCategories)}>Delete</button>
                    </div>
                    <a href={`update/category/${category.title}`} className="absolute top-2 right-2 bg-primary rounded-full p-2 border-[1px] border-gray-300"><FaEdit size={20} className="text-gray-500 relative left-[2px]"/></a>
                </div>
            )
    })
}