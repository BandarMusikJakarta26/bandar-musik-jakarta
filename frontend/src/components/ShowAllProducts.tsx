import { AdvancedImage } from "@cloudinary/react"
import { cloudSDK, host } from "../../libs/config"
import { useEffect, useState } from "react"
import responsivePage from "../action/screen.action"

function DesktopUI({ products, according }: { products: any[], according: string }){
    return products.map((product, index)=>{
        return (
            <a className="group card shadow-xl p-4 relative flex flex-col gap-y-3 bg-white hover:-translate-y-2  transition-all" key={index} href={`${according == "produk" ? `/admin/update/produk/${product.name}` : `/produk/${product.url}`}`}>
                <div className="gambar bg-gradient-to-t from-primary to-gray-400 scale-100 group-hover:scale-[1.02] group-hover:brightness-[0.8] transition-all">
                    <div className="md:w-[350px] transition group">
                        <img src={`${host}/storage/${product.images[0]}`} className="group-hover:hidden"/>
                        <img src={product.images.length > 1 ? `${host}/storage/${product.images[1]}` : `${host}/storage/${product.images[0]}`} className="hidden group-hover:block"/>
                    </div>
                </div>
                <div className="name-product text-center md:text-left">
                    <h1 className="text-[20px] md:text-[18px] font-bold md:font-bold mb-1 md:mb-0 text-center">{product.name}</h1>
                    <p className="text-[14px] md:text-[14px] font-normal md:opacity-60 mt-[-3px] text-center italic">{product.kategoriId}</p>
                </div>
                <div className="lihat flex justify-center items-center">
                    {according == "produk" ? <p className="text-center border-2 border-third px-2">Edit Produk</p> : <p className="text-center border-2 border-third px-3 group-hover:bg-third group-hover:text-primary transition-all">Lihat Detail</p> }
                </div>
              
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
            <div className="header flex justify-between items-center">
                <div className="header-title">
                    <p className="text-[32px] text-third font-bold tracking-tight">Daftar Produk</p>
                    <p className="text-[16px] text-third font-normal -mt-1">terdapat {products.length} produk pada {according} {according == "brand" ? <a href={`brand/${products[0].brandId}`} className="underline">{products[0].brandId}</a> : false}
                    </p>
                    
                </div>
                <div className="filter flex gap-x-8 justify-center ml-[100px] px-8 py-3 bg-white rounded-2xl">

                <select name="urutan" id="" className="filterProduct outline-none px-2">
                    <option value="" selected>Urutan</option>
                    <option value="">A-Z</option>
                    <option value="">Z-A</option>
                </select>
                <select name="kategori" id="" className="filterProduct outline-none px-2">
                    <option value="" selected>Kategori</option>
                    <option value="">Tertinggi</option>
                    <option value="">Terendah</option>
                </select>
                <select name="harga" id="" className="filterProduct outline-none px-2">
                    <option value="" selected>Harga</option>
                    <option value="">Tertinggi</option>
                    <option value="">Terendah</option>
                </select>

                </div>
                <input type="text" placeholder="Search"/>
            </div>

            <div className="product-list w-full grid grid-cols-1 md:grid-cols-4 gap-y-4 md:gap-x-6 md:gap-y-10">
                <DesktopUI products={currentProducts} according={according}/>
            </div>
            
            <div className="pagination w-full flex justify-center gap-x-1 md:gap-x-3 mt-4">
                <ShowPagination pagesNumber={products} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
        </>
    )
}