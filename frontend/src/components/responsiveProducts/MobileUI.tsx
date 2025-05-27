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
                <div className="gambarnya overflow-hidden rounded-md">
                <div className="gambar bg-gradient-to-t from-primary to-[#cdcdcd] p-1">
                    <div className="w-full">
                        <img src={`${host}/storage/${product.images[0]}`} className="group-hover:hidden"/>
                        <img src={product.images.length > 1 ? `${host}/storage/${product.images[1]}` : `${host}/storage/${product.images[0]}`} className="hidden group-hover:block"/>
                    </div>
                </div>

                </div>

                <div className={`${according == "admin" ? "pt-2" : "pt-4"} pb-4 w-full px-2`}>
                    <h1 className="text-[11px] md:text-[16px] font-semibold h-[35px]">{name}</h1>
                    <p className="text-[9px] font-normal opacity-70 italic mt-[2px]">{product.kategoriId}</p>
                    
                    {product.stock && product.stock > 0 && product.promo ? <div className=" 
                 text-blue-600 text-[8px] italic font-semibold z-10">
                    Check Stock
                </div> : false}
                    {product.stock && product.stock > 0 && !product.promo ? <div className=" 
                 text-green-500 text-[8px] italic font-semibold z-10">
                    In-Stock
                </div> : false}
                {(product.stock && product.stock == 0) || !product.stock ? <div className=" 
                 text-red-500 text-[8px] italic font-semibold">
                    On-Stock
                </div> : false}
                {product.stock && product.stock < 0 ? <div className="
                 text-orange-500 text-[8px] italic font-semibold">
                    Pre-Order
                </div> : false}

                    <div className="garis h-[1px] bg-gray-300 w-full mt-1"></div>

                    {product.offlinePrice || product.pricelist ? <div className="harga mt-1">
                        <p className={`text-[12px] text-red-700 font-bold tracking-tight ${product.offlinePrice && product.offlinePrice.split(' ')[1] ? 'line-through' : false}`}>{product.offlinePrice && product.offlinePrice.split(' ')[1] ? setCurrency(product.offlinePrice.split(' ')[0]) : product.offlinePrice ? setCurrency(product.offlinePrice) : false}</p>
                        
                        { product.pricelist && <div className="pricelist flex gap-x-1">
                            <p className="text-third text-[9px] italic">Pricelist</p>
                            <p className={`text-[9px] font-bold ${product.pricelist && product.pricelist.split(' ')[1] ? 'line-through' : false}`}>{product.pricelist && product.pricelist.split(' ')[1] ? setCurrency(product.pricelist.split(' ')[0]) : product.pricelist ? setCurrency(product.pricelist) : false}</p>
                        </div>
                        }
                    </div> : false}

                    {according == "admin" ? 
                        <div className="admin grid grid-cols-3 gap-x-2 mt-2">
                            <a className="text-center border-[1px] border-gray-400 px-1 transition-all text-[9px] py-[2px] flex justify-center rounded-md" href={`/produk/${product.url}`}><FaRegEye size={16} className="text-third"/></a> 
                            <a className="text-center border-[1px] border-gray-400 px-1 transition-all py-[2px] flex justify-center rounded-md" href={`/admin/update/produk/${product.url}`}><FaEdit size={16} className="text-third"/></a> 
                            <button className="text-center border-[1px] border-gray-400 px-1 py-[2px] flex justify-center rounded-md" onClick={()=>deleteAction(product.url)}><MdDelete size={16} className="text-third"/></button> 
                        </div> : false
                    }

                </div>
                
                {product.promo && product.stock && product.stock > 0 && product.namaPromo.toLowerCase() !== "java jazz" ? <p className="text-[10px] absolute top-0 left-0 bg-teal-600 text-white px-2 py-[1px] rounded-md">
                    Promo
                </p>: false }

                <div className="hargapromo absolute top-[158px] left-[0px] flex items-center">

                {product.promo && product.stock && product.stock !== 0 ? <div className=" text-white text-[9px] bg-teal-600 px-2 py-[1px] italic border-[1px] border-teal-600">
                    <span className="text-white text-[8px] bg-teal-600 py-[2px]">{!product.namaPromo ? 'Promo' : 
                    product.namaPromo
                }</span>
                </div>: false}

                {product.promo && product.stock && product.stock !== 0 ? <div className=" text-third text-[10px] bg-[#fafafa] flex gap-x-1 items-center px-1 font-semibold border-[1px] border-gray-300">
                    {setCurrency(product.promo)}
                </div>: false}

                </div>

                {product.promo && product.stock && product.stock > 0 ? <div className="absolute top-[0px] right-[0px] rounded flex items-center gap-x-1 bg-teal-600 text-white px-1">
                    <span className="text-[12px] font-bold">{product.stock}</span><span className="text-[9px] italic mt-[2px]">tersisa</span>
                </div> : false}

            </ParentMobileUI>

        )
    })
}