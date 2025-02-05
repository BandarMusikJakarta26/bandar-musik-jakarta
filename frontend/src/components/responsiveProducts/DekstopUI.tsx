import { AiFillFire } from "react-icons/ai"
import { host } from "../../../libs/config"
import { setCurrency } from "../../action/produk.action"
import ParentDesktopUI from "./ParentDesktopUI"
import { FaEdit, FaRegEye } from "react-icons/fa"
import { MdDelete } from "react-icons/md"

export default function DesktopUI({ products, according, deleteAction = false }: { products: any[], according: string, deleteAction: any }){

    return products.map((product, index)=>{
        return (
            <ParentDesktopUI product={product} index={index} according={according}>
           
                <div className="gambar bg-gradient-to-t from-primary to-gray-400 scale-100 group-hover:scale-[1.02] group-hover:brightness-[0.8] transition-all">
                    <div className="md:w-[350px] transition group">
                        <img src={`${host}/storage/${product.images[0]}`} className="group-hover:hidden"/>
                        <img src={product.images.length > 1 ? `${host}/storage/${product.images[1]}` : `${host}/storage/${product.images[0]}`} className="hidden group-hover:block"/>
                    </div>
                </div>
                <div className="name-product text-center md:text-left">
                    <h1 className="text-[20px] md:text-[18px] font-bold md:font-bold mb-1 md:mb-0 text-center">{product.name}</h1>
                    <p className="text-[14px] md:text-[14px] font-normal md:opacity-60 mt-[-3px] text-center italic">{product.kategoriId}</p>
                    <p className={`text-[30px] text-center font-bold tracking-tight ${product.offlinePrice && product.offlinePrice.split(' ')[1] ? 'line-through' : false}`}>{product.offlinePrice && product.offlinePrice.split(' ')[1] ? setCurrency(product.offlinePrice.split(' ')[0]) : product.offlinePrice ? setCurrency(product.offlinePrice) : false}</p>
                    <p className={`text-[14px] font-bold text-red-700 text-center -mt-[6px] ${product.pricelist && product.pricelist.split(' ')[1] ? 'line-through' : false}`}>{product.pricelist && product.pricelist.split(' ')[1] ? setCurrency(product.pricelist.split(' ')[0]) : product.pricelist ? setCurrency(product.pricelist) : false}</p>
                </div>
                <div className="lihat flex justify-center items-center">
                    {according !== "admin" ? <p className="text-center border-2 border-third px-3 group-hover:bg-third group-hover:text-primary transition-all">Lihat Detail</p> : false}
                    {according == "admin" ? 
                        <div className="admin grid grid-cols-3 gap-x-6">
                            <a className="text-center border-2 border-gray-400 transition-all rounded-md flex justify-center items-center text-third hover:text-white hover:bg-green-600 hover:border-green-600" href={`/produk/${product.url}`}><FaRegEye size={20}/></a> 
                            <a className="text-center border-2 border-gray-400 transition-all rounded-md flex justify-center items-center text-third hover:text-white hover:bg-sky-600 hover:border-sky-600" href={`/admin/update/produk/${product.url}`}><FaEdit size={18}/></a> 
                            <button className="text-center border-2 border-gray-400 transition-all rounded-md flex justify-center items-center text-third hover:text-white hover:bg-red-600 hover:border-red-600 px-4 py-1" onClick={()=>deleteAction(product.url)}><MdDelete size={18}/></button> 
                        </div> : false
                    }
                </div>

                {product.promo && product.stock && product.stock !== 0 ? <div className="absolute top-[30px] left-7 text-white rounded-3xl text-[14px] bg-sky-800 px-4 font-semibold py-[2px]">
                    PROMO
                </div>: false}
                {product.promo && product.stock && product.stock !== 0 ? <div className="absolute top-[60px] left-2 text-white rounded-3xl text-[18px] bg-sky-800 px-4 -rotate-2">
                    {setCurrency(product.promo)}
                </div>: false}


                {product.promo && product.stock && product.stock > 0 ? <div className="absolute top-[30px] right-[6px] text-white px-1 py-1 animate-bounce  bg-sky-800 rounded">
                    <div className="satulagi border-2 border-sky-200 flex items-center gap-x-1 px-1">
                        <AiFillFire size={18} className="text-primary"/>
                        <span className="text-[20px]">{product.stock}</span><span className="text-[13px] italic mt-[2px]">tersisa</span>
                    </div>
                </div> : false}
            
            </ParentDesktopUI>
        )
    })
}