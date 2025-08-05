import { useNavigate, useParams } from "react-router"
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
import LoadingPage from "../../components/LoadingPage";
import { BsArrowRightCircle } from "react-icons/bs";
import responsivePage from "../../action/screen.action";
import ZoomImage from "./ZoomImage";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BsCheckCircle } from "react-icons/bs";
import { TbSquareRoundedArrowRight } from "react-icons/tb";
import { ReactSortable } from 'react-sortablejs'
import axiosClient from "../../../libs/axiosConfig";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";

export default function Product({ login }: { login: boolean }){
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
    const [ deskContent, showDeskContent ] = useState<boolean>(false)

    const [views, setView] = useState<number>(0)

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

    useEffect(()=>{
        // localStorage.clear()
        let viewKey
        if(product){
            viewKey = `${product.name} Views`
            let currentViews = parseInt(localStorage.getItem(viewKey)!) || 0
            currentViews += 1
            localStorage.setItem(viewKey!, currentViews.toLocaleString())

            return setView(currentViews)
        }
    }, [product])

    console.log(loadingan)

    function ShowMiniImages({productImages, url}: { productImages: any[], url: string}){
        const [images, setImages] = useState<any[]>(productImages)
        const [perubahan, setPerubahan] = useState<boolean>(false)
        const navigate = useNavigate()

        useEffect(()=>{
            images.filter((image,index)=>{
                if(image !== productImages[index]) return setPerubahan(true)
                else { perubahan && setPerubahan(false) }
            })
        }, [images])
        
        async function updateGambar(url: string){
            try{
                const res = await axiosClient.post(`api/update/produk/images/${url}`, { images })
                if(res.data.success) return navigate(0)
            }catch(err){   
                console.log(err)
            }
        }

        async function hapusGambar(image: string, url: string){
            const produk = await axiosClient.get(`api/update/produk/delete/image/${url}?image=${image}`)
            console.log(produk)
        }

        return (
            <>
            <ReactSortable list={images} setList={setImages} animation={200} className={`gambarmini grid grid-cols-4 gap-x-2 px-10 mt-[-6px]`}>
            { images.map((image: string, index: number)=>{
                 return (
                    <>

                 <div className={`${active == `${host}/storage/${image}` || ( image == product.images[0] && !active ) ? 'brightness-100 border-third' : 'brightness-[0.8] scale-100 border-primary'} border-2  h-auto bg-primary hover:cursor-pointer relative`} onClick={()=>setActive(`${host}/storage/${image}`)} key={index}>
                    <img src={`${host}/storage/${image}`} className="md:h-[130px]"/>
                    {<button className="absolute bottom-0" onClick={()=>hapusGambar(image, url)}>
                        <MdDelete size={30} className="text-primary rounded-full p-1 bg-red-500"/>
                    </button>}
                </div>

                    </>
                 )
            }) }
            </ReactSortable>
            { ( login && perubahan ) && <button className="bg-white px-6 py-1 border-2 rounded-2xl border-third text-third mt-6 ml-10 hover:shadow-lg hover:scale-95 transition duration-300" onClick={()=>updateGambar(url)}>Simpan</button>}
            </>
        )
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

    function getSpecification(spec: string){
        let specs = spec.split('Spesifikasi :')[1] || spec.split('Spesification :')[1] as any
        specs = specs.split('\r\n\r\n')[0]
        specs = specs.split('\r\n').filter((spec: any)=>spec !== "")
        return specs.map((spek: any, index: number)=>{ return <li className={`border-b-[1px] list-none border-gray-400 p-4 grid grid-cols-[1fr_24fr] ${index%2 == 0 ? 'bg-primary' : 'bg-gray-200'}`}>
            <BsCheckCircle size={18} className="text-teal-800 mt-[2px]"/>
            <span>{spek.split('* ')[1]}</span>
        </li> })
    }

    function getFeature(spec: string){
        let specs = spec.split('Fitur :')[1] || spec.split('Features :')[1] as any
        specs = specs.split('\r\n\r\n')[0]
        specs = specs.split('\r\n').filter((spec: any)=>spec !== "")
        return specs.map((spek: any, index: number)=>{ return <li className={`border-b-[1px] list-none border-gray-400 p-4 grid grid-cols-[1fr_24fr] ${index%2 == 0 ? 'bg-primary' : 'bg-gray-200'}`}>
            <BsCheckCircle size={18} className="text-teal-800 mt-[2px]"/>
            <span>{spek.split('* ')[1]}</span>
        </li> })
    }

    function generateDesk(deskripsi :string){
        const desk = deskripsi.split('\r\n')[0]
        return <p className="whitespace-pre-line">{desk}</p>
    }

    let deskripsiSingkat = product && product.description.split('\n')[0] as any
    if(product){
        if(deskripsiSingkat.length > 250){
            deskripsiSingkat = deskripsiSingkat.slice(0, 250) + "..."
        }
    }

    function ShowFullImage({ img, alt }: { img:string, alt: string }){
        return (
                <div className={`image-content absolute z-50 w-full h-[100%] bg-[#202020] top-0 left-0 overflow-hidden`}>
                    <div className="outer-img w-full flex justify-center items-center h-full p-10">
                        <div className="kotak-img bg-primary rounded-2xl relative">
                            <FaRegWindowClose size={screen <= 768 ? 30 : 48} className="text-third absolute top-2 right-3 hover:cursor-pointer z-30" onClick={()=>showImageContent(false)}/>
                            <img src={img} className="relative z-20 w-full md:h-[80vh]" alt={alt}/>
                            <img className="gambar md:h-full md:w-full p-10 md:p-32 absolute z-0 top-[6px] left-[10px] md:top-[0px] md:left-[0px] opacity-20" src={watermark}/>
                        </div>
                    </div>
                </div>
        )
    }

    if(!product && loading) return <LoadingPage/>
    else if(product && !loading)return (
        <>
        
        {imageContent && <ShowFullImage img={active ? active : `${host}/storage/${product.images[0]}`} alt={product.name}/>}

        <div className={`product ${imageContent ? 'hidden' : 'visible' }`} id="produk">


            <div className="main w-full md:flex justify-between py-10 md:mt-6 md:py-20 px-10 relative md:bg-[#fafafa] rounded-3xl">
            <div className="area-gambar w-[100%] md:w-[40%] relative z-10 mx-auto md:mx-0">

            <div className="gambar h-auto px-10 mb-3 relative">
                <div className="group gambar-produk w-full h-full border-[1px] md:border-2 border-gray-300 md:border-gray-200 relative overflow-hidden z-10">
                    {product.images.length > 0 ? <ZoomImage src={active ? active : `${host}/storage/${product.images[0]}`} width="100%" height="100%" alt={product.name}/> : false}
                </div>
                <button onClick={()=>showImageContent(true)} className="top-0 -left-2 absolute md:top-[20px] md:left-[60px] rounded-full p-1 border-[1px] bg-white z-10">
                    <TiZoomInOutline size={screen <= 768 ? 28 : 40} className="text-third"/>
                </button>
                {screen <= 768 && <img className="gambar h-full p-4 absolute z-0 top-0 left-[42px] opacity-20" src={watermark}/>}
            </div>


            <div className="minigambar w-full">

            <div>
                <ShowMiniImages productImages={product.images} url={product.url}/>
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

                <div className="text-gray-500 italic text-[12px] md:text-[14px] tracking-tight flex gap-x-1 items-center">
                    <IoMdEye size={20} className="relative"/>
                    {views} telah dilihat
                </div>

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

            <div className="desk px-6 py-8 md:px-28 md:py-10  rounded-3xl mx-6 md:mx-0 mt-8 md:mt-10 border-[1px] border-gray-300 md:border-none md:bg-white" id="deskripsi">
                <div className="desk-head flex justify-between">
                    <p className="font-bold opaity-70 text-[14px] md:text-[24px]">Deskripsi Produk</p>
                    <div className="desk-dll flex gap-x-4 items-center">
                        { product.description.includes("Spesifikasi :") || product.description.includes("Spesification :") ? <a className="flex items-center gap-x-1 justify-center border-[1px] border-third w-[150px] text-center rounded-xl py-1 cursor-pointer hover:bg-third hover:text-primary transition-all" onClick={()=>showDeskContent(true)}>
                            Spesifikasi
                            <TbSquareRoundedArrowRight size={24} className="animate-zoom-in"/>
                        </a>  : false }
                        { product.description.includes("Fitur :") || product.description.includes("Features :") ? <a className="flex items-center gap-x-1 justify-center border-[1px] border-third w-[150px] text-center rounded-xl py-1 cursor-pointer hover:bg-third hover:text-primary transition-all" onClick={()=>showDeskContent(true)}>
                            Fitur
                            <TbSquareRoundedArrowRight size={24} className="animate-zoom-in"/>
                        </a>  : false }
                    </div>
                </div>
                <div className="garis h-[2px] w-[122px] md:w-[190px] bg-third rounded-full opacity-65 mt-1"/>
                <div className="text-[12px] md:text-[16px] leading-8 text-justify mt-2 md:mt-4">{generateDesk(product.description)}</div>
                <iframe className="w-full h-[200px] md:h-[500px] rounded-xl md:rounded-3xl mt-20"
                    src="https://www.youtube.com/embed/kAyUTMY2olM?si=7xnvZfqwGsswkXHv?autoplay=1&mute=0">
                </iframe>
                <div className="keatas flex justify-center pt-10 pb-4">
                    <a href="#produk">
                        <IoIosArrowDropup size={60} className="text-third"/>
                    </a>
                </div>
            </div>
        </div>

        <div className={`deskripsi-tambahan w-full h-[100vh] fixed top-0 left-[2000px] z-[70] ${deskContent ? '-translate-x-[1200px]' : 'translate-x-0'} transition duration-1000`}>
            <IoMdCloseCircleOutline size={60} className="text-third absolute top-[50%] left-[-40px] p-2 bg-primary rounded-bl-full rounded-tl-full z-[80] cursor-pointer" onClick={()=>showDeskContent(false)}/>
            <div className="konten-deskripsi w-full h-full bg-primary relative px-20 py-14 flex flex-col gap-y-8 overflow-scroll">
                { (product.description.split('Spesifikasi :')[1] || product.description.split('Spesification :')[1]) && <div className="spek">
                    <h1 className="text-[36px] text-third font-bold tracking-tight">Spesifikasi</h1>
                    <div className="w-[54%]">{ getSpecification(product.description) }</div>
                </div>}
                { (product.description.split('Fitur :')[1] || product.description.split('Features :')[1])  && <div className="fitur">
                    <h1 className="text-[36px] text-third font-bold tracking-tight">Fitur</h1>
                    <div className="w-[54%]">{ getFeature(product.description) }</div>
                </div> }
            </div>
        </div>
        <div className={`overlah fixed w-full left-0 top-0 h-[100vh] bg-black ${deskContent ? 'opacity-70 z-[60]' : 'opacity-0 z-[-1]'} transition duration-1000`}></div>

        </>
    )
    else <LoadingPage/>
}



