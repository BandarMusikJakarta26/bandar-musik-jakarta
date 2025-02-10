import { host } from "../../../libs/config"
import { setCurrency } from "../../action/produk.action"
import ParentDesktopUI from "./ParentDesktopUI"
import { FaEdit, FaRegEye } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { IoMdPricetag } from "react-icons/io";

export default function DesktopUI({ products, according, deleteAction = false }: { products: any[], according: string, deleteAction: any }){
    return products.map((product, index)=>{
        return (
            <ParentDesktopUI product={product} index={index} according={according}>
           
                <div className="gambar bg-gradient-to-t from-[#fafafa] to-[#ccc] group-hover:to-[#aaa] transition-all rounded-lg relative overflow-hidden">

                {product.promo && product.stock && product.stock > 0 ? <p className="text-[13px] absolute top-[-20px] left-[-46px] bg-red-600 text-white px-8 rounded-md -rotate-45 uppercase font-bold pt-10 pb-[1px]">
                    Promo
                </p>: false }

                {product.promo && product.stock && product.stock > 0 ? <div className="absolute top-[8px] left-[8px] bg-primary p-1 rounded-full z-20"></div>: false }

                    <div className="md:w-[100%] transition group">
                        <img src={`${host}/storage/${product.images[0]}`} className="group-hover:hidden"/>
                        <img src={product.images.length > 1 ? `${host}/storage/${product.images[1]}` : `${host}/storage/${product.images[0]}`} className="hidden group-hover:block"/>
                    </div>
                </div>

                <div className="text-boundary px-5 w-full">

                <div className="name-product text-center md:text-left">
                    <p className="text-[14px] md:text-[12px] font-normal md:opacity-70 italic">{product.kategoriId}</p>
                    <h1 className="text-[20px] md:text-[15px] font-bold md:font-bold mb-1 md:mb-0 h-[62px] overflow-hidden">{product.name}</h1>

                    <div className="garis h-[1px] w-full bg-gray-300 mt-3"></div>

                    <div className="sub flex justify-between items-center py-2">

                    <div className="harga">

                    <p className={`text-[20px] font-bold tracking-tight inline ${product.offlinePrice && product.offlinePrice.split(' ')[1] ? 'line-through' : false}`}>{product.offlinePrice && product.offlinePrice.split(' ')[1] ? setCurrency(product.offlinePrice.split(' ')[0]) : product.offlinePrice ? setCurrency(product.offlinePrice) : false}</p>

                    { product.pricelist &&
                        <div className="pricelist flex items-center gap-x-1">
                            <p className="text-[13px] text-red-600 tracking-tight italic">Pricelist</p>
                            <p className={`text-[13px] font-bold text-red-600 -mt-[2px] ${product.pricelist && product.pricelist.split(' ')[1] ? 'line-through' : false}`}>{product.pricelist && product.pricelist.split(' ')[1] ? setCurrency(product.pricelist.split(' ')[0]) : product.pricelist ? setCurrency(product.pricelist) : false}</p>
                        </div>
                    }

                    </div>

                    <div className="lihat flex mt-4">
                    {according !== "admin" ? <p className="text-center border-2 border-third px-4 group-hover:bg-third group-hover:text-primary transition-all text-[14px] ">Lihat</p> : false}

                    </div>

                    </div>

                </div>

                {according == "admin" ? 
                        <div className="admin grid grid-cols-3 gap-x-6">
                            <a className="text-center border-2 border-gray-400 transition-all rounded-md flex justify-center items-center text-third hover:text-white hover:bg-green-600 hover:border-green-600" href={`/produk/${product.url}`}><FaRegEye size={20}/></a> 
                            <a className="text-center border-2 border-gray-400 transition-all rounded-md flex justify-center items-center text-third hover:text-white hover:bg-sky-600 hover:border-sky-600" href={`/admin/update/produk/${product.url}`}><FaEdit size={18}/></a> 
                            <button className="text-center border-2 border-gray-400 transition-all rounded-md flex justify-center items-center text-third hover:text-white hover:bg-red-600 hover:border-red-600 px-4 py-1" onClick={()=>deleteAction(product.url)}><MdDelete size={18}/></button> 
                        </div> : false
                    }

                </div>

                {product.promo && product.stock && product.stock !== 0 ? <div className="absolute top-[256px] left-[8px] flex flex-col">
                    <span className="text-white text-[11px] bg-red-600 px-3 py-[2px] animate-zoom-in">{!product.namaPromo ? 'Promo' : product.namaPromo}</span>
                </div>: false}
                {product.promo && product.stock && product.stock !== 0 ? <div className="absolute top-[278px] left-[8px] text-third text-[13px] bg-[#fafafa] flex gap-x-1 items-center rounded-tr-xl px-2 font-semibold py-[2px] border-[1px] border-gray-400 animate-zoom-in">
                    <IoMdPricetag size={21} className="bg-red-600 text-white rounded-full p-1"/>
                    {setCurrency(product.promo)}
                </div>: false}
                {product.stock && product.stock > 0 ? <div className="absolute top-[278px] right-[14px] text-third px-2 border-[1px] border-gray-300 rounded flex items-center gap-x-1 bg-[#fafafa]">
                    <span className="text-[16px] font-extrabold">{product.stock}</span><span className="text-[11px] italic -mt-[1px]">tersisa</span>
                </div> : false}
            
            </ParentDesktopUI>
        )
    })
}