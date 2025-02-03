import { useParams } from "react-router"
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getProductByName, setCurrency } from "../../action/produk.action";
import { host } from "../../../libs/config";
import watermark from '/utils/BMJTransparant.png';
import { IoIosArrowDropup } from "react-icons/io";

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

    function forwardWhatsapp(url: string, harga: string){
        const productLink = `https://bandarmusikjakarta.com/produk/${url}`
        return open(`https://wa.me/62081929290560?text=Halo BMJ, Saya sedang mencari barang : ${productLink}, senilai ${harga} apakah tersedia?`, "blank")
    }

    function ShowPromo({product} : { product : any}){
        return (
            <button className="promo border-2 border-third px-4 py-2 rounded-2xl hover:scale-105 transition-all" onClick={()=>forwardWhatsapp(product.url, product.promo)}>
                <p className="text-center rounded-3xl text-[15px] text-third font-bold">Walk in Price</p>
                <p className="text-[26px] text-center md:text-left md:text-[30px] font-bold tracking-tight -mt-1 justify-self-center">{setCurrency(product.promo)}</p>
            </button>
        )
    }

    function generateDesk(deskripsi :string){
        const tulisan = deskripsi.split('\r\n').filter(tulis=>tulis!=="")
        const lists = tulisan.filter(tulis=>tulis.includes('*'))
        const desk = deskripsi.split('*')[0]
        
        if(lists.length > 0){
            function ShowDeskList(){
                return lists.map((list: string, index: number)=>{
                    return <div key={index} className="flex mb-2 md:px-8 px-3">
                        <div className="listing w-[10%] md:flex md:justify-end pr-2">
                            <div className="point w-[7px] h-[7px] bg-third rounded-full relative top-[6px] md:top-2"></div>
                        </div>
                        <div className="text w-full">
                            <p className="md:ml-3 font-semibold text-left">{list.split('*')[1].trim()}</p>
                        </div>
                    </div>
                })
            }

            return (
                <>
                    <p className="whitespace-pre-line">{desk}</p>
                    <br />
                    <ShowDeskList/> 
                </>
            )
        }
        else return <p className="whitespace-pre-line">{desk}</p>
    }

    if(!product) return false
    else return (
        <div className="product" id="produk">

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
                    <div className="brand w-full md:block relative top-8 md:static md:top-0">
                        <p className="font-semibold text-[12px] md:text-[18px] md:mb-[-14px] underline">
                            <a className="opacity-60 hover:opacity-100" href={`/kategori/${product.kategoriId}`}>{product.kategoriId} </a>
                            <a className="opacity-60 hover:opacity-100" href={`/brand/${product.brandId}`}>/ {product.brandId}</a>
                        </p>
                    </div>
                </div>
                <h1 className="text-[18px] md:text-[28px] font-bold mt-5 md:mt-0">{product.name}</h1>
                <div className="pembelian flex flex-col md:flex-row justify-between w-full mt-2">
                    <div className="harga">
                        <div className={`price grid gap-x-10 ${product.promo !== null ? 'grid-cols-[1fr_1fr_2fr]' : 'grid-cols-[1fr_2fr_1fr]' }`}>
                            
                        { product.onlinePrice && <button className={`online border-2 border-third px-4 py-2 rounded-2xl ${product.promo !== null ? 'opacity-80' : false} hover:scale-105 transition-all hover:opacity-100`} onClick={()=>forwardWhatsapp(product.url, product.onlinePrice)}>
                            <p className="text-center rounded-3xl text-[15px] text-third font-bold">Online Price</p>
                            <p className="text-[26px] text-center md:text-left md:text-[30px] font-bold tracking-tight -mt-1">{setCurrency(product.onlinePrice)}</p>
                        </button> }

                        { product.offlinePrice && <button className={`offline border-2 border-third px-4 py-2 rounded-2xl ${product.promo !== null ? 'opacity-80' : false} hover:cursor-pointer hover:opacity-100 transition-all hover:scale-105`} onClick={()=>forwardWhatsapp(product.url, product.offlinePrice)}>
                            <p className="text-center rounded-3xl text-[15px] text-third font-bold">Offline Price</p>
                            <p className={`text-[26px] text-center md:text-left md:text-[30px] font-bold tracking-tight -mt-1 justify-self-center ${product.promo !== null || product.offlinePrice.split(' ')[1] == 'true' ? 'line-through' : false}`}>{setCurrency(product.offlinePrice)}</p>
                        </button> }


                        { product.promo && <ShowPromo product={product}/> }

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

            <div className="desk px-6 py-8 md:px-28 md:py-10 bg-white rounded-3xl md:mx-20 mx-6 mt-8 md:mt-0">
                <p className="font-bold opacity-70 text-[14px] md:text-[24px]">Deskripsi Produk</p>
                <div className="garis h-[2px] w-[122px] md:w-[190px] bg-third rounded-full opacity-65 mt-1"/>
                <div className="text-[12px] md:text-[18px] text-justify mt-2 md:mt-4">{generateDesk(product.description)}</div>
                <iframe className="w-full h-[200px] md:h-[500px] rounded-xl md:rounded-3xl mt-20"
                    src="https://www.youtube.com/embed/tgbNymZ7vqY?controls=1">
                </iframe>
                <div className="keatas flex justify-center pt-10 pb-4">
                    <a href="#produk">
                        <IoIosArrowDropup size={60} className="text-third"/>
                    </a>
                </div>
            </div>
        </div>
    )
}