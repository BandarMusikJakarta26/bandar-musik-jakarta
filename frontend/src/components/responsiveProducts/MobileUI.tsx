import { host } from "../../../libs/config"
import { setCurrency } from "../../action/produk.action"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import ParentMobileUI from "./ParentMobileUI";

export default function MobileUI({ products, according, deleteAction }: { products: any[], according: string, deleteAction: any }){
    const limit = 24
    return products.map((product, index)=>{
        let name = product.name
        if(name.length > limit){
            name = name.slice(0, limit) + " ..."
        }
        return (
            <ParentMobileUI product={product} index={index} according={according}>
                <div className="gambar bg-gradient-to-t from-primary to-gray-400 p-1">
                    <div className="w-full">
                        <img src={`${host}/storage/${product.images[0]}`} className="group-hover:hidden"/>
                        <img src={product.images.length > 1 ? `${host}/storage/${product.images[1]}` : `${host}/storage/${product.images[0]}`} className="hidden group-hover:block"/>
                    </div>
                </div>
                <div className="pb-2 w-full px-3">
                    <h1 className="text-[13px] md:text-[16px] font-semibold">{name}</h1>
                    <p className="text-[11px] font-normal opacity-70 italic">{product.kategoriId}</p>
                    <p className={`text-[15px] font-bold ${product.offlinePrice && product.offlinePrice.split(' ')[1] ? 'line-through' : false}`}>{product.offlinePrice && product.offlinePrice.split(' ')[1] ? setCurrency(product.offlinePrice.split(' ')[0]) : product.offlinePrice ? setCurrency(product.offlinePrice) : false}</p>
                    <p className={`text-[11px] font-bold text-red-700 ${product.pricelist && product.pricelist.split(' ')[1] ? 'line-through' : false}`}>{product.pricelist && product.pricelist.split(' ')[1] ? setCurrency(product.pricelist.split(' ')[0]) : product.pricelist ? setCurrency(product.pricelist) : false}</p>

                    {according == "admin" ? 
                        <div className="admin grid grid-cols-3 gap-x-2 mt-2">
                            <a className="text-center border-[1px] border-gray-400 px-1 transition-all text-[9px] py-[2px] flex justify-center rounded-md" href={`/produk/${product.url}`}><FaRegEye size={16} className="text-third"/></a> 
                            <a className="text-center border-[1px] border-gray-400 px-1 transition-all py-[2px] flex justify-center rounded-md" href={`/admin/update/produk/${product.url}`}><FaEdit size={16} className="text-third"/></a> 
                            <button className="text-center border-[1px] border-gray-400 px-1 py-[2px] flex justify-center rounded-md" onClick={()=>deleteAction(product.url)}><MdDelete size={16} className="text-third"/></button> 
                        </div> : false
                    }

                </div>
                
                {product.promo && product.stock && product.stock > 0 ? <p className="absolute top-[124px] left-0 text-[9px] bg-red-600 text-white px-[8px] rounded-tl-md rounded-br-md flex items-center gap-x-[5px]"><i className="mt-[3px]">Promo</i><span className="text-[11px]">{setCurrency(product.promo)}</span></p> : false}

                {product.stock && product.stock !== 0 ? <div className="absolute top-[4px] right-[4px] text-white px-[6px]  bg-sky-700 rounded flex items-center gap-x-1 border-[1px] border-sky-300">
                    <span className="text-[13px]">{product.stock}</span><span className="text-[9px] italic mt-[2px]">tersisa</span>
                </div> : false}
            </ParentMobileUI>

        )
    })
}