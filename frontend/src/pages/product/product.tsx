import { useParams } from "react-router"
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getProductByName } from "../../action/produk.action";
import { host } from "../../../libs/config";
import watermark from '/utils/BMJTransparant.png';

export default function Product(){
    const { name } = useParams()
    const [ nama, setNama ] = useState<string>('')
    const [ product, setProduct ] = useState<any | null>(null)
    const [ active, setActive ] = useState<string | null>(null)

    useEffect(()=>{ getProductByName(setProduct, name!) }, [])

    function ShowMiniImages({productImages}: { productImages: any[] }){
        return productImages.map((image: string, index: number)=>{
            return <div className={`${active == `${host}/storage/${image}` || ( image == product.images[0] && !active ) ? 'brightness-100' : 'brightness-[0.6] scale-90'} border-2 border-third h-auto bg-primary hover:cursor-pointer`} onClick={()=>setActive(`${host}/storage/${image}`)} key={index}>
                <img src={`${host}/storage/${image}`} className="md:h-[100px]"/>
            </div>
        })
    }

    function forwardWhatsapp(productName: string, harga: string){
        const productLink = `https://bandarmusikjakarta.com/produk/${productName}`
        return open(`https://wa.me/62081929290560?text=Halo BMJ, Saya sedang mencari barang : ${productLink}, senilai ${harga} apakah tersedia?`, "blank")
    }

    function ShowPromo({promo} : { promo : string}){
        return (
            <div className="promo border-2 border-third px-4 py-2 rounded-2xl">
                <p className="text-center rounded-3xl text-[15px] text-third font-bold">Walk in Price</p>
                <p className="text-[26px] text-center md:text-left md:text-[30px] font-bold tracking-tight -mt-1 justify-self-center">{promo}</p>
            </div>
        )
    }

    if(!product) return false
    else return (
        <div className="main w-full md:flex justify-between mt-10 md:mt-6 md:py-20 px-10 relative">
            <div className="area-gambar w-full md:w-[34%] relative z-10">

            <div className="gambar h-auto px-10 mb-3">
                <div className="group gambar-produk w-full h-full">
                    {product.images.length > 0 ? <img src={active ? active : `${host}/storage/${product.images[0]}`} className="group-hover:scale-125 md:group-hover:scale-150 group-hover:cursor-grab transition-all"/> : <h1>{product.name}</h1>}
                </div>
            </div>
            <div className={`gambarmini grid grid-cols-4 gap-x-2 px-10 mt-[-24px]`}>
                <ShowMiniImages productImages={product.images}/>
            </div>

            </div>

            <img className="gambar h-[100px] w-[100px] md:h-[400px] md:w-[400px] md:p-10 absolute z-0 top-[18px] left-[100px] md:top-[100px] md:left-[120px] opacity-40" src={watermark}/>
            <div className="tulisan flex flex-col gap-y-4 w-full md:w-[60%] mt-10 md:mt-0">
                <div className="brandName flex">
                    <div className="brand w-full flex md:block justify-center">
                        <p className="font-semibold text-[12px] md:text-[16px] mb-[] md:mb-[-20px] underline">
                            <a className="opacity-60 hover:opacity-100" href={`/kategori/${product.kategoriId}`}>{product.kategoriId} </a>
                            <a className="opacity-60 hover:opacity-100" href={`/brand/${product.brandId}`}>/ {product.brandId}</a>
                        </p>
                    </div>
                </div>
                <h1 className="text-[22px] md:text-[45px] font-bold mt-5 md:mt-0">{product.name}</h1>
                <p className="font-bold opacity-70 text-[14px] md:text-[16px]">Deskripsi Produk</p>
                <div className="garis h-[2px] w-[115px] md:w-[130px] bg-third rounded-full mt-[-8px]"/>
                <p className="text-[12px] md:text-[14px] text-justify mt-[-12px]">{product.description}</p>
                <div className="pembelian flex flex-col md:flex-row justify-between w-full mt-2">
                    <div className="harga">
                        <div className={`price grid gap-x-10 ${product.promo !== null ? 'grid-cols-[1fr_1fr_2fr]' : 'grid-cols-[1fr_2fr_1fr]' }`}>
                            
                        { product.onlinePrice && <div className={`online border-2 border-third px-4 py-2 rounded-2xl ${product.promo !== null ? 'opacity-80' : false}`}>
                            <p className="text-center rounded-3xl text-[15px] text-third font-bold">Online Price</p>
                            <p className="text-[26px] text-center md:text-left md:text-[30px] font-bold tracking-tight -mt-1">{product.onlinePrice}</p>
                        </div> }

                        { product.offlinePrice && <button className={`offline border-2 border-third px-4 py-2 rounded-2xl ${product.promo !== null ? 'opacity-80' : false} hover:cursor-pointer hover:opacity-100 transition-all`} onClick={()=>forwardWhatsapp(product.name, product.offlinePrice)}>
                            <p className="text-center rounded-3xl text-[15px] text-third font-bold">Offline Price</p>
                            <p className={`text-[26px] text-center md:text-left md:text-[30px] font-bold tracking-tight -mt-1 justify-self-center ${product.promo !== null ? 'line-through' : false}`}>{product.offlinePrice}</p>
                        </button> }


                        { product.promo && <ShowPromo promo={product.promo}/> }

                        </div>
                            
                    </div>
                </div>
                    <div className="tanya grid grid-cols-[2fr_1fr] gap-x-20 mt-6">
                        <div className="input-nama">
                            <p className="text-[14px] ml-[50px] mb-[6px]">Mohon untuk memasukkan nama anda sebelum menanyakan barang</p>
                            <input type="text" placeholder="Masukkan nama ..." className="rounded-full w-full border-2 border-third" value={nama} onChange={(e)=>setNama(e.target.value)}/>
                        </div>
                        <div className="kotak-link  mt-[22px]">
                            <button className="py-[14px] px-8 bg-green-700 text-primary flex items-center gap-x-2 rounded-3xl md:mt-0 text-[14px] md:text-[16px] hover:brightness-90 transition-all" onClick={()=>forwardWhatsapp(nama, product.name)}><FaWhatsapp size={24}/>Tanya Barang</button>
                        </div>
                    </div>
            </div>
        </div>
    )
}