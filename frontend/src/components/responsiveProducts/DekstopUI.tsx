import { host } from "../../../libs/config"
import { setCurrency } from "../../action/produk.action"
import ParentDesktopUI from "./ParentDesktopUI"
import { FaEdit, FaRegEye } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { IoMdPricetag } from "react-icons/io";
import { useContext } from "react"
import { UsdContext } from "../../../libs/store"
import { BiDollar } from "react-icons/bi";
import { useNavigate } from "react-router"
import disc from '../../../public/utils/disc.png'

export default function DesktopUI({ products, according, deleteAction = false }: { products: any[], according: string, deleteAction: any }){
    const context = useContext(UsdContext)
    const navigate = useNavigate()

    return products.map((product, index)=>{

        // product.name = product.name.length > 48 ? product.name.substring(0, 48) : product.name
        // console.log(product.name, product.name.length)

        return (
                <ParentDesktopUI product={product} index={index} according={according}>
           
                <div className="gambar border-[1px] border-gray-200 group-hover:border-gray-300 bg:primary group-hover:bg-gray-200 transition-all rounded-lg relative overflow-hidden">

                {product.promo && product.stock && product.stock > 0 && product.namaPromo !== "Java Jazz" ? <p className="text-[10px] absolute top-[-23px] left-[-46px] bg-red-600 text-white px-8 rounded-md -rotate-45 uppercase font-bold pt-10 pb-[1px]">
                    Promo
                </p>: false }

                {product.promo && product.stock && product.stock > 0 && product.namaPromo == "Java Jazz" ? <img src={disc} alt={disc} className="absolute top-[5px] left-[5px] w-10 z-20"/> : false }

                    <div className="md:w-[100%] transition group relative">
                        <img src={`${host}/storage/${product.images[0]}`} className={`translate-y-0 opacity-100 ${product.images.length > 1 && 'group-hover:translate-y-[280px] group-hover:opacity-0'} transition duration-700`}/>
                        <img src={product.images.length > 1 ? `${host}/storage/${product.images[1]}` : `${host}/storage/${product.images[0]}`} className={`translate-y-[-280px] opacity-0 ${product.images.length > 1 && 'group-hover:translate-y-0 group-hover:opacity-100'} transition duration-700 absolute top-0`}/>
                    </div>
                </div>

                <div className="text-boundary px-5 w-full h-[200px] grid grid-rows-1">

                <div className="name-product text-center md:text-left">
                    <p className="text-[14px] md:text-[11px] font-normal md:opacity-70 italic">{product.kategoriId}</p>
                    <h1 className="text-[20px] md:text-[14px] font-bold md:font-bold mb-1 md:mb-2 h-[40px] overflow-hidden">{product.name}</h1>

                    <div className="jasa flex gap-x-2 text-[8.5px] h-[20px] text-teal-700 items-center">
                        {product.kirim == 1 && <p className="border-[1px] border-teal-700 px-2 py-[3px] rounded-xl italic">Gratis Kirim</p>}
                        {product.pasang == 1 && <p className="border-[1px] border-teal-700 px-2 py-[3px] rounded-xl italic">Gratis Pasang</p>}
                    </div>

                    <div className="garis h-[1px] w-full bg-gray-300 mt-3"></div>

                    <div className="sub flex justify-between items-center py-2">

                    <div className="harga">

                    {context && product.offlinePrice ? <p className={`text-[20px] text-red-600 font-bold tracking-tight inline flex items-center ${product.offlinePrice && product.offlinePrice.includes('true') ? 'line-through' : false}`}><BiDollar size={22} /> { product.offlinePrice.split(' ')[1] }</p> : false }

                    {!context && <p className={`text-[18px] text-red-600 font-bold tracking-tight inline ${product.offlinePrice && product.offlinePrice.includes('true') ? 'line-through' : false}`}>{product.offlinePrice && product.offlinePrice.split(' ')[1] ? setCurrency(product.offlinePrice.split(' ')[0]) : product.offlinePrice ? setCurrency(product.offlinePrice) : false}</p>}

                    { product.pricelist &&
                        <div className="pricelist flex xitems-center gap-x-1">
                            <p className="text-[11px] text-third tracking-tight italic">Pricelist</p>
                            <p className={`text-[11px] font-semibold text-third -mt-[2px] ${product.pricelist && product.pricelist.split(' ')[1] ? 'line-through' : false}`}>{product.pricelist && product.pricelist.split(' ')[1] ? setCurrency(product.pricelist.split(' ')[0]) : product.pricelist ? setCurrency(product.pricelist) : false}</p>
                        </div>
                    }

                    </div>

                    <div className="lihat flex">
                    {according !== "admin" ? <p className="text-center border-[1px] border-third px-3 group-hover:bg-third group-hover:text-primary transition-all text-[12px] ">Lihat</p> : false}

                    </div>

                    </div>

                </div>

                <div className="parent-admin">
                {according == "admin" ? 
                        <div className="admin grid grid-cols-3 gap-x-6 mt-4 ">
                            <a className="text-center border-2 border-gray-400 transition-all rounded-md flex justify-center items-center text-third hover:text-white hover:bg-green-600 hover:border-green-600" href={`/produk/${product.url}`}><FaRegEye size={18}/></a> 
                            <button className="text-center border-2 border-gray-400 transition-all rounded-md flex justify-center items-center text-third hover:text-white hover:bg-sky-600 hover:border-sky-600" onClick={()=>navigate(`/admin/update/produk/${product.url}`, { state: { previousUrl: location.pathname } })}><FaEdit size={16}/></button> 
                            <button className="text-center border-2 border-gray-400 transition-all rounded-md flex justify-center items-center text-third hover:text-white hover:bg-red-600 hover:border-red-600 px-4 py-1" onClick={()=>deleteAction(product.url)}><MdDelete size={19}/></button> 
                        </div> : false
                    }
                </div>

                </div>

                {product.promo && product.stock && product.stock !== 0 ? <div className="absolute top-[215px] left-[8px] flex flex-col">
                    <span className={`text-white text-[10px] bg-red-600 px-2 py-[0px] animate-zoom-in ${product.namaPromo.toLowerCase() == "java jazz" ? 'bg-purple-700' : '' }`}>{!product.namaPromo ? 'Promo' : product.namaPromo.toLowerCase() == "java jazz" ? `${product.namaPromo} 2025` : product.namaPromo}</span>
                </div>: false}
                {product.promo && product.stock && product.stock !== 0 ? <div className="absolute top-[230px] left-[8px] text-third bg-primary flex gap-x-1 items-center rounded-tr-xl px-2 font-semibold py-[2px] border-[1px] border-gray-300 animate-zoom-in text-[13px]">
                    <IoMdPricetag size={16} className="bg-red-600 text-white rounded-full p-[3px]"/>
                    {setCurrency(product.promo)}
                </div>: false}
                {product.promo && product.stock && product.stock > 0 ? <div className="absolute top-[12px] right-[12px] text-third px-2 border-[1px] border-gray-300 rounded flex items-center gap-x-1 bg-[#fafafa]">
                    <span className="text-[14px] font-extrabold">{product.stock}</span><span className="text-[10px] italic -mt-[1px]">tersisa</span>
                </div> : false}

                {product.promo && product.stock && product.stock > 0 ? <div className="absolute top-[264px] right-[18px] rounded-xl 
                 text-blue-500 text-[10px] italic font-semibold">
                    Check Stock
                </div> : false}
                {product.stock && product.stock > 0 && !product.promo ? <div className="absolute top-[264px] right-[18px] rounded-xl 
                 text-green-500 text-[10px] italic font-semibold">
                    In-Stock
                </div> : false}
                {(product.stock && product.stock == 0) || !product.stock ? <div className="absolute top-[264px] right-[18px] rounded-xl 
                 text-red-500 text-[10px] italic font-semibold">
                    On-Stock
                </div> : false}
                {product.stock && product.stock < 0 ? <div className="absolute top-[264px] right-[18px] rounded-xl 
                 text-orange-500 text-[10px] italic font-semibold">
                    Pre-Order
                </div> : false}
            
                </ParentDesktopUI>

        )
    })
}