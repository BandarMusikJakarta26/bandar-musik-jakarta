import { useParams } from "react-router"
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getProductByName, setCurrency } from "../../action/produk.action";
import { host } from "../../../libs/config";
import watermark from '/utils/BMJTransparant.png';
import { IoIosArrowDropup } from "react-icons/io";
import { getBrandByName } from "../../action/brand.action";
import { BiSolidRightArrow } from "react-icons/bi";
import { FaRegWindowClose } from "react-icons/fa"; 
import { LuPackageSearch } from "react-icons/lu";
import { TiZoomInOutline } from "react-icons/ti";
// import BlankPage from "../blank";
import LoadingPage from "../../components/LoadingPage";
import { BsArrowRightCircle } from "react-icons/bs";
import responsivePage from "../../action/screen.action";
// import { TbTruckDelivery } from "react-icons/tb";


export default function Product(){
    const { name } = useParams()
    const [ screen, setScreen ] = useState<number>(window.innerWidth)
    // const [ nama, setNama ] = useState<string>('')
    const [ product, setProduct ] = useState<any | null>(null)
    const [ brand, setBrand ] = useState<any | null>(null)
    const [ active, setActive ] = useState<string | null>(null)
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ loadingan, setLoadingan ] = useState<boolean>(true)
    const [ onlineActive, setOnlineActive ] = useState<boolean>(false)
    const [ offlineActive, setOfflineActive ] = useState<boolean>(false)
    const [ promoActive, setPromoActive ] = useState<boolean>(false)
    const [ imageContent, showImageContent ] = useState<boolean>(false)

    useEffect(()=>{
        if(product) setProduct(product)
        else getProductByName(setProduct, name!)
        setLoading(false)
        return ()=>setProduct(null) 
    }, [])

    useEffect(()=>{ responsivePage(setScreen) }, [])

    useEffect(()=>{
        product && getBrandByName(setBrand, setLoadingan, product.brandId)
    }, [product])

    console.log(loadingan)

    function ShowMiniImages({productImages}: { productImages: any[] }){
        return productImages.map((image: string, index: number)=>{
            return <div className={`${active == `${host}/storage/${image}` || ( image == product.images[0] && !active ) ? 'brightness-100 border-third' : 'brightness-[0.8] scale-100 border-primary'} border-2  h-auto bg-primary hover:cursor-pointer`} onClick={()=>setActive(`${host}/storage/${image}`)} key={index}>
                <img src={`${host}/storage/${image}`} className="md:h-[130px]"/>
            </div>
        })
    }

    function forwardWhatsapp(url: string, harga: string){
        const productLink = `https://bandarmusikjakarta.com/produk/${url}`
        return open(`https://wa.me/62081929290560?text=Halo BMJ, Saya sedang mencari barang : ${productLink}, senilai ${harga} apakah tersedia?`, "blank")
    }

    function ShowPromo({product} : { product : any}){
        return (
            <button className="w-full mt-4 md:mt-0 promo border-2 rounded-lg border-teal-700 px-4 py-2 hover:bg-teal-600 hover:border-teal-900 hover:text-white transition duration-100 ease-in relative" onClick={()=>forwardWhatsapp(product.url, product.promo)} onMouseEnter={()=>setPromoActive(true)} onMouseLeave={()=>setPromoActive(false)}>
                <p className="text-center rounded-3xl text-[10px] md:text-[15px] font-semibold">{promoActive ? 'Tanya Promo' : false }</p>
                {!promoActive && <p className="text-center rounded-3xl text-[15px] font-semibold">{product.namaPromo !== "Promo" ? `Promo ${product.namaPromo !== null ? product.namaPromo : ''}` : product.namaPromo}</p>}
                <p className="text-[20px] text-center md:text-left md:text-[30px] font-bold tracking-tight -mt-1 justify-self-center">{promoActive ? <span className="flex items-center gap-x-2"><FaWhatsapp size={28}/>Whatsapp</span> : `${setCurrency(product.promo)}`}</p>
                {product.pajak == 1 && <p className={`absolute top-[8px] right-[8px] rounded-full text-[13px] ${screen <= 768 ? 'bg-primary' : 'bg-[#fefefe]'} text-teal-500  w-[20px] h-[20px] leading-[20px]`}>++</p>}
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

    let deskripsiSingkat = product && product.description.split('\n')[0] as any
    if(product){
        if(deskripsiSingkat.length > 250){
            deskripsiSingkat = deskripsiSingkat.slice(0, 250) + "..."
        }
    }

    function ShowFullImage({ img }: { img:string }){
        return (
                <div className={`image-content absolute z-50 w-full h-[100%] bg-[#202020] top-0 left-0 overflow-hidden`}>
                    <div className="outer-img w-full flex justify-center items-center h-full p-10">
                        <div className="kotak-img bg-primary rounded-2xl relative">
                            <FaRegWindowClose size={screen <= 768 ? 30 : 48} className="text-third absolute top-2 right-3 hover:cursor-pointer z-30" onClick={()=>showImageContent(false)}/>
                            <img src={img} className="relative z-20 w-full md:h-[80vh]"/>
                            <img className="gambar md:h-full md:w-full p-10 md:p-32 absolute z-0 top-[6px] left-[10px] md:top-[0px] md:left-[0px] opacity-20" src={watermark}/>
                        </div>
                    </div>
                </div>
        )
    }

    if(!product && loading) return <LoadingPage/>
    else if(product && !loading)return (
        <>
        
        {imageContent && <ShowFullImage img={active ? active : `${host}/storage/${product.images[0]}`}/>}

        <div className={`product ${imageContent ? 'hidden' : 'visible' }`} id="produk">


            <div className="main w-full md:flex justify-between py-10 md:mt-6 md:py-20 px-10 relative md:bg-[#fafafa] rounded-3xl">
            <div className="area-gambar w-[100%] md:w-[40%] relative z-10 mx-auto md:mx-0">

            <div className="gambar h-auto px-10 mb-3 relative">
                <div className="group gambar-produk w-full h-full border-[1px] md:border-2 border-gray-300 md:border-gray-200">
                    {product.images.length > 0 ? <img src={active ? active : `${host}/storage/${product.images[0]}`} className="relative z-10"/> : false}
                </div>
                <button onClick={()=>showImageContent(true)} className="top-0 -left-2 absolute md:top-[20px] md:left-[60px] rounded-full p-1 border-[1px] bg-white">
                    <TiZoomInOutline size={screen <= 768 ? 28 : 40} className="text-third"/>
                </button>
                {screen <= 768 &&<img className="gambar h-full p-4 absolute z-0 top-0 left-[42px] opacity-20" src={watermark}/>}
            </div>


            <div className="minigambar w-full">

            <div className={`gambarmini grid grid-cols-4 gap-x-2 px-10 mt-[-6px]`}>
                <ShowMiniImages productImages={product.images}/>
            </div>

            </div>
            </div>

            {screen > 768 &&<img className="gambar md:h-[458px] md:w-[458px] md:p-10 absolute z-0 md:top-[100px] md:left-[120px] opacity-20" src={watermark}/>}
            
            <div className="tulisan flex flex-col gap-y-6 w-full md:w-[60%] mt-10 md:mt-0 md:px-16">

                {screen > 768 && <div className="atasan">
                    { brand && <img src={`${host}/storage/${brand.image}`} className="w-[120px] border-[1px] border-gray-200 px-[6px]"/> }
                </div>}

                <div className="brandName flex mt-[-45px] md:mt-[-8px]">
                    <div className="brand w-full md:block relative top-8 md:static md:top-0">
                        <p className="font-semibold text-[12px] md:text-[15px] md:mb-[-18px] flex items-center gap-x-1">
                            <a className="opacity-60 hover:opacity-100 transition-all" href={`/kategori/${product.kategoriId}`}>{product.kategoriId} </a>
                            <BiSolidRightArrow size={10} className="text-third opacity-60"/>
                            <a className="opacity-60 hover:opacity-100 transition-all" href={`/brand/${product.brandId}`}>{product.brandId}</a>
                        </p>
                    </div>
                </div>
                <h1 className="text-[18px] md:text-[28px] font-bold mt-5 md:mt-0">{product.name}</h1>
                <p className="text-justify h-[87px] overflow-hidden -mt-3 leading-[24px] md:leading-[30px] text-[13px] md:text-[16px]">{deskripsiSingkat} <a href="#deskripsi" className="underline italic font-semibold">Baca Selengkapnya</a></p>
                <div className="pembelian flex flex-col md:flex-row justify-between w-full mt-2">
                    <div className="harga">
                        <div className={`price grid md:gap-x-6 grid-cols-2 gap-x-3 ${product.promo !== null ? 'md:grid-cols-[1fr_1fr_2fr]' : 'md:grid-cols-[1fr_2fr_1fr]' } w-full`}>
                            
                        { product.onlinePrice && product.onlinePrice !== product.offlinePrice && <button className={`online border-[1px] rounded-lg border-gray-300 px-4 py-2 hover:border-gray-600   ${product.promo !== null ? 'opacity-80' : false} hover:opacity-100 transition duration-200 ease-in md:w-[240px] flex flex-col justify-between items-center relative`} onClick={()=>forwardWhatsapp(product.url, product.onlinePrice)}
                        onMouseEnter={()=>setOnlineActive(true)} onMouseLeave={()=>setOnlineActive(false)}>
                            <p className="text-center rounded-3xl text-[10px] md:text-[15px] text-third font-semibold">{onlineActive ? <span>Tanya Barang</span>:<span>Harga Online</span>}</p>
                            <p className="text-[14px] text-center md:text-left md:text-[30px] font-bold tracking-tight -mt-1">{
                                onlineActive ? <span className="flex items-center gap-x-2 text-[28px]"><FaWhatsapp size={32}/>Whatsapp</span> :
                                <span>{setCurrency(product.onlinePrice)}</span>
                            }</p>
                            {product.pajak == 1 && <p className="absolute top-0 right-0 md:top-[8px] md:right-[8px] rounded-full text-[9px] md:text-[13px] bg-[#fefefe] text-gray-500  w-[20px] h-[20px] leading-[20px]">++</p>}
                        </button> }

                        { product.offlinePrice && <button className={`online border-[1px] rounded-lg border-gray-300 px-4 py-2 hover:border-gray-600 ${product.promo !== null ? 'opacity-80' : false} hover:opacity-100 transition duration-200 ease-in group block md:w-[240px] relative`} onClick={()=>forwardWhatsapp(product.url, product.offlinePrice)} onMouseEnter={()=>setOfflineActive(true)} onMouseLeave={()=>setOfflineActive(false)}>
                            <p className="text-center rounded-3xl text-[10px] md:text-[15px] text-third font-semibold">
                                { offlineActive && !product.promo ? <span>Tanya Barang</span> :
                                    offlineActive && product.promo ? <span className="w-full relative flex justify-center -left-10 group-hover:translate-x-10 transition-all"><BsArrowRightCircle size={40}/></span> : <span>Harga Offline</span>
                                }
                                {product.pajak == 1 && <p className="absolute top-0 right-0 md:top-[8px] md:right-[8px] rounded-full text-[9px] md:text-[13px] bg-[#fefefe] text-gray-500  w-[20px] h-[20px] leading-[20px]">++</p>}
                            </p>
                          
                             <p className={`text-[14px] text-center md:text-left md:text-[30px] font-bold tracking-tight -mt-1 justify-self-center ${product.offlinePrice && product.offlinePrice.split(' ')[1] ? 'line-through' : false}`}>
                                { offlineActive && !product.promo && <span className="flex items-center gap-x-2 text-[24px]"><FaWhatsapp size={32}/>Whatsapp</span> }
                                { !offlineActive ? product.offlinePrice && product.offlinePrice.split(' ')[1] ? setCurrency(product.offlinePrice.split(' ')[0]) : setCurrency(product.offlinePrice) : false }
                            </p>
             
                        </button> }

                        { product.promo && screen > 768 && <ShowPromo product={product}/> }

                        </div>
                            
                        { product.promo && screen <= 768 && <ShowPromo product={product}/> }

                    </div>
                </div>
                    <div className="tanya grid grid-cols-2 md:grid-cols-3 md:gap-x-8 w-full items-center">

                        <div className="kotak-link">
                            <button  onClick={()=>forwardWhatsapp(product.url, product.offlinePrice)} className="group px-4 md:px-5 py-2 md:rounded-md flex relative overflow-hidden border-[1px] border-third hover:scale-105 transition-all w-full">
                                <div className="transition-all delay-150 duration-300 ease-in-out element flex items-center w-full gap-x-2 group-hover:text-white relative z-10 text-[13px] md:text-[16px]">
                                    <FaWhatsapp size={screen <= 768 ? 28 : 24}/>
                                    <span className="text-left">Tanya Barang?</span>
                                </div>
                                <div className="transition-all delay-150 duration-500 ease-in-out bg-but bg-teal-600 w-full absolute top-[-100px] left-0 h-[100px] group-hover:top-0 z-0"></div>
                            </button>
                        </div>

                        <div className="kotak-ongkir">
                            <a href="https://biteship.com/id/cek-ongkir" target="_blank" className=" group px-4 md:px-5 py-2 md:rounded-md flex relative overflow-hidden border-[1px] border-third  hover:scale-105 transition-all">
                                <div className="transition-all delay-150 duration-300 ease-in-out element flex items-center w-full gap-x-2 group-hover:text-white relative z-10 text-[13px] md:text-[16px]">
                                    <LuPackageSearch size={screen <= 768 ? 28 : 24}/>
                                    <span className="text-left">Cek Ongkir</span>
                                </div>
                                <div className="transition-all delay-150 duration-500 ease-in-out bg-but bg-amber-600 w-full absolute bottom-[-100px] left-0 h-[100px] group-hover:bottom-0 z-0"></div>
                            </a>
                        </div>

                        <div className="jasa flex justify-center md:grid md:grid-cols-2 w-full gap-x-8 md:gap-x-0 col-span-2 md:col-span-1">

                        {product.kirim == 1 && <div className="pengiriman text-third flex flex-col items-center py-[11px] px-4 gap-x-2">
                            <div className="text-kirim">
                                <p className="bg-teal-600 text-white text-center font-semibold rounded-2xl text-[10px] md:text-[12px]">GRATIS</p>
                                <p className="italic text-[12px] md:text-[14px] text-gray-500">Pengiriman</p>
                            </div>
                        </div>}

                        {product.pasang == 1 && <div className="pengiriman text-third flex flex-col items-center py-[11px] px-4 gap-x-2">
                            <div className="text-kirim">
                                <p className="bg-teal-600 text-white text-center font-semibold rounded-2xl text-[10px] md:text-[12px]">GRATIS</p>
                                <p className="italic text-[12px] md:text-[14px] text-gray-500">Pemasangan</p>
                            </div>
                        </div>}

                        </div>

                    </div>

                    <div className={`tambahan md:grid ${product.berat && (product.panjang || product.lebar || product.tinggi) ? 'grid-cols-[1fr_3fr]' : ''}`}>

                    {product.berat && <div className="berat">
                        <h1 className="text-[13px] md:text-[18px] font-semibold tracking-tight border-[1px] border-gray-200 md:border-gray-300 px-4 py-2 text-center md:text-left">Berat</h1>
                        <li className="border-[1px] border-gray-200 md:border-gray-300 mt-[-1px] px-4 py-2 text-[13px] md:text-[16px] text-center md:text-left">{product.berat/1000} kg</li>
                    </div>}

                    {(product.panjang || product.lebar || product.tinggi) && <div className="kotak">
                        <h1 className="text-[13px] md:text-[18px] font-semibold tracking-tight border-[1px] border-gray-200 md:border-gray-300 px-4 py-2 text-center md:text-left">Dimensi Volume</h1>
                        <div className="kotak-dimensi grid grid-cols-3">
                            {product.panjang && <p className="text-[13px] md:text-[16px] border-[1px] border-gray-200 md:border-gray-300 mt-[-1px] px-4 py-2"><span className="italic text-[#777] text-[11px] md:text-[14px]">Panjang :</span> {product.panjang} cm</p>}
                            {product.lebar && <p className="text-[13px] md:text-[16px] border-[1px] border-gray-200 md:border-gray-300 mt-[-1px] px-4 py-2"><span className="italic text-[#777] text-[11px] md:text-[14px]">Lebar :</span> {product.lebar} cm</p>}
                            {product.tinggi && <p className="text-[13px] md:text-[16px] border-[1px] border-gray-200 md:border-gray-300 mt-[-1px] px-4 py-2"><span className="italic text-[#777] text-[11px] md:text-[14px]">Tinggi:</span> {product.tinggi} cm</p>}
                        </div>
                    </div>}

                    </div>

            </div>
            </div>

            <div className="desk px-6 py-8 md:px-28 md:py-10 md:bg-white rounded-3xl md:mx-20 mx-6 mt-8 md:mt-10 border-[1px] border-gray-300 md:border-0" id="deskripsi">
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


        </>
    )
    else <LoadingPage/>
}
