import { AdvancedImage } from "@cloudinary/react"
import { cloudSDK, host } from "../../libs/config"
import { useEffect, useState } from "react"
import responsivePage from "../action/screen.action"

function DesktopUI({ products }: { products: any[] }){
    return products.map((product, index)=>{
        console.log(product.images)
        return (
            <a className="group card shadow-xl p-6 relative flex flex-col gap-y-3 bg-white rounded-2xl"key={index} href={`/produk/${product.name}`}>
                <div className="gambar rounded-full scale-100 group-hover:bg-[#fafafa] group-hover:scale-[1.03] transition-all">
                    <div className="md:w-[320px] transition group">
                        <img src={`${host}/storage/${product.images[0]}`} className="group-hover:hidden"/>
                        <img src={product.images[1] !== undefined ? `${host}/storage/${product.images[1]}` : `${host}/storage/${product.images[0]}}`} className="hidden group-hover:block"/>
                    </div>
                </div>
                <div className="name-product text-center md:text-left">
                    <h1 className="text-[20px] md:text-[21px] font-bold md:font-bold mb-1 md:mb-0 text-center">{product.name}</h1>
                    <p className="text-[14px] md:text-[16px] font-normal md:opacity-60 mt-[-3px] text-center">{product.kategoriId}</p>
                </div>
                <div className="lihat flex justify-center items-center">
                    <p className="text-center underline">Lihat Detail</p>
                </div>
                {/* <div className="harga grid grid-cols-3 gap-x-3">
                    <div className="pricelist">
                        <p className="text-center text-[14px] mb-[-6px] opacity-80">Pricelist</p>
                        <p className="mt-2 font-semibold text-center tracking-tight border-2 border-third rounded-2xl hover:bg-third hover:text-primary transition-all">{product.harga}</p>
                    </div>
                    <div className="pricelist">
                        <p className="text-center text-[14px] mb-[-6px] opacity-80">MAP</p>
                        <p className="mt-2 font-semibold text-center tracking-tight border-2 border-third rounded-2xl hover:bg-third hover:text-primary transition-all">{product.harga}</p>
                    </div>
                    <div className="pricelist">
                        <p className="text-center text-[14px] mb-[-6px] opacity-80">Offline</p>
                        <p className="mt-2 font-semibold text-center tracking-tight border-2 border-third rounded-2xl hover:bg-third hover:text-primary transition-all">{product.harga}</p>
                    </div>
                 
                </div> */}
            </a>
        )
    })
}

function MobileUI({ products }: { products: any[] }){
    return products.map((product, index)=>{
        return (
            <a className="flex bg-[#fbfbfb] rounded-[16px] overflow-hidden items-center gap-x-3 group" key={index} href={`/produk/${product.name}`}>
                <div className="gambar bg-[#dfdfdf] p-3">
                    <div className="w-[90px]">
                        {product.images.length > 0 ? <AdvancedImage cldImg={cloudSDK.image(product.images[0])} className="group-hover:hidden"/> : false}
                        {product.images.length > 0 ? <AdvancedImage cldImg={cloudSDK.image(product.images[1] !== undefined ? product.images[1] : product.images[0])} className="hidden group-hover:block"/> : false}
                    </div>
                </div>
                <div className="py-3">
                    <h1 className="text-[14px] md:text-[16px] font-bold">{product.name}</h1>
                    <p className="text-[12px] font-normal opacity-70 -mt-[2px]">{product.categoryName}</p>
                    
                    {/* <div className="harga grid grid-cols-3 gap-x-10 mt-2">
                    <div className="pricelist">
                        <p className="text-left text-[12px] mb-[-6px] opacity-80">Pricelist</p>
                        <p className="mt-2 font-semibold tracking-tight text-[13px]">{product.harga}</p>
                    </div>
                    <div className="pricelist">
                        <p className="text-left text-[12px] mb-[-6px] opacity-80">Pricelist</p>
                        <p className="mt-2 font-semibold tracking-tight text-[13px]">{product.harga}</p>
                    </div>
                    <div className="pricelist">
                        <p className="text-left text-[12px] mb-[-6px] opacity-80">Pricelist</p>
                        <p className="mt-2 font-semibold tracking-tight text-[13px]">{product.harga}</p>
                    </div>  
                    </div> */}

                </div>
            
            </a>
        )
    })
}

function ShowPagination({ pagesNumber, currentPage, setCurrentPage }: { pagesNumber: any[], currentPage: number,setCurrentPage: React.SetStateAction<any>}){
    const totalPage = Math.floor(pagesNumber.length/20)
    let pagination = []
    for(let i = 0; i <= totalPage; i++){
        pagination.push(i+1)
    }
    return pagination.map((value)=>{
        return <p className={`${value == currentPage ? 'opacity-100 bg-third text-primary' : 'opacity-50'} px-2 hover:cursor-pointer border-2 border-third text-[14px] md:text-[18px]`} onClick={()=>setCurrentPage(value)}>{value}</p>
    })
}

export default function ShowAllProducts({ products, according }: { products: any[], according: string }){
    const [ screen, setScreen ] = useState<number>(window.innerWidth)
    const [ currentPage, setCurrentPage ] = useState<number>(1)

    console.log(according)
    const productPerPage = 20
    const lastPostPage = currentPage * productPerPage
    const firstPostPage = lastPostPage - productPerPage
    const currentProducts = products.slice(firstPostPage, lastPostPage)

    useEffect(()=>{ responsivePage(setScreen) })

    if(screen <= 768 ) return (
        <>
            <div className="title-product flex px-6 justify-between items-center">
                <h1 className="text-[16px] font-bold">Products</h1>
                <p className="text-[12px]">Filter</p>
            </div>
            <MobileUI products={currentProducts}/>
            <div className="pagination w-full flex justify-center gap-x-3 mt-4">
                <ShowPagination pagesNumber={products} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
        </>)
    else return (
        <>
            <div className="product-list w-full grid grid-cols-1 md:grid-cols-4 gap-y-4 md:gap-x-8 md:gap-y-10">
                <DesktopUI products={currentProducts}/>
            </div>
            
            <div className="pagination w-full flex justify-center gap-x-1 md:gap-x-3 mt-4">
                <ShowPagination pagesNumber={products} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
        </>
    )
}