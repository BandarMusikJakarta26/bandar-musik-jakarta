import { host } from "../../libs/config"
import { useEffect, useState } from "react"
import responsivePage from "../action/screen.action"
import { setCurrency } from "../action/produk.action"
import { AiFillFire } from "react-icons/ai";

function DesktopUI({ products, according }: { products: any[], according: string }){

    return products.map((product, index)=>{
        return (
            <a className="group card shadow-xl p-4 relative flex flex-col gap-y-3 bg-white hover:-translate-y-2  transition-all" key={index} href={`${according == "produk" ? `/admin/update/produk/${product.url}` : `/produk/${product.url}`}`}>
                <div className="gambar bg-gradient-to-t from-primary to-gray-400 scale-100 group-hover:scale-[1.02] group-hover:brightness-[0.8] transition-all">
                    <div className="md:w-[350px] transition group">
                        <img src={`${host}/storage/${product.images[0]}`} className="group-hover:hidden"/>
                        <img src={product.images.length > 1 ? `${host}/storage/${product.images[1]}` : `${host}/storage/${product.images[0]}`} className="hidden group-hover:block"/>
                    </div>
                </div>
                <div className="name-product text-center md:text-left">
                    <h1 className="text-[20px] md:text-[18px] font-bold md:font-bold mb-1 md:mb-0 text-center">{product.name}</h1>
                    <p className="text-[14px] md:text-[14px] font-normal md:opacity-60 mt-[-3px] text-center italic">{product.kategoriId}</p>
                    <p className={`text-[30px] text-center font-bold tracking-tight ${product.offlinePrice && product.offlinePrice.split(' ')[1] ? 'line-through' : false}`}>{product.offlinePrice && product.offlinePrice.split(' ')[1] ? setCurrency(product.offlinePrice.split(' ')[0]) : product.offlinePrice ? setCurrency(product.offlinePrice) : false}</p>
                    <p className={`text-[14px] font-bold text-red-700 text-center -mt-[6px] ${product.pricelist && product.pricelist.split(' ')[1] ? 'line-through' : false}`}>{product.pricelist && product.pricelist.split(' ')[1] ? setCurrency(product.pricelist.split(' ')[0]) : product.pricelist ? setCurrency(product.pricelist) : false}</p>
                </div>
                <div className="lihat flex justify-center items-center">
                    {according == "produk" ? <p className="text-center border-2 border-third px-2">Edit Produk</p> : <p className="text-center border-2 border-third px-3 group-hover:bg-third group-hover:text-primary transition-all">Lihat Detail</p> }
                </div>

                {product.promo && product.stock && product.stock !== 0 ? <div className="absolute top-[30px] left-7 text-white rounded-3xl text-[14px] bg-sky-800 px-4 font-semibold py-[2px]">
                    PROMO
                </div>: false}
                {product.promo && product.stock && product.stock !== 0 ? <div className="absolute top-[60px] left-2 text-white rounded-3xl text-[18px] bg-sky-800 px-4 -rotate-2">
                    {setCurrency(product.promo)}
                </div>: false}


                {product.stock && product.stock !== 0 ? <div className="absolute top-[30px] right-[6px] text-white px-1 py-1 animate-bounce  bg-sky-800 rounded">
                    <div className="satulagi border-2 border-sky-200 flex items-center gap-x-1 px-1">
                        <AiFillFire size={18} className="text-primary"/>
                        <span className="text-[20px]">{product.stock}</span><span className="text-[13px] italic mt-[2px]">tersisa</span>
                    </div>
                </div> : false}
            </a>
        )
    })
}

function MobileUI({ products }: { products: any[] }){
    const limit = 24
    return products.map((product, index)=>{
        let name = product.name
        if(name.length > limit){
            name = name.slice(0, limit) + " ..."
        }
        return (
            <a className="flex bg-primary rounded-lg overflow-hidden items-center group flex-col shadow-md relative" key={index} href={`/produk/${product.url}`}>
                <div className="gambar bg-gradient-to-t from-primary to-gray-400 p-1">
                    <div className="w-full">
                        <img src={`${host}/storage/${product.images[0]}`} className="group-hover:hidden"/>
                        <img src={product.images.length > 1 ? `${host}/storage/${product.images[1]}` : `${host}/storage/${product.images[0]}`} className="hidden group-hover:block"/>
                    </div>
                </div>
                <div className="pb-2 w-full px-3">
                    <h1 className="text-[13px] md:text-[16px] font-semibold">{name}</h1>
                    <p className="text-[11px] font-normal opacity-70 italic">{product.kategoriId}</p>
                    <p className="text-[15px] font-bold">{product.promo ? setCurrency(product.promo) : product.offlinePrice && product.offlinePrice.split(' ')[1] ? setCurrency(product.offlinePrice.split(' ')[0]) :
                    product.offlinePrice ? setCurrency(product.offlinePrice) : false}</p>
                    <p className="text-[11px] font-bold line-through text-red-700">{product.promo && product.offlinePrice ? setCurrency(product.offlinePrice.split(' ')[1] ? product.offlinePrice.split(' ')[0] : product.offlinePrice) : false}</p>
                </div>
                {product.promo && <p className="absolute top-[124PX] left-3 text-[9px] bg-red-600 text-white px-[10px] rounded-md">Promo</p>}
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
            <div className="products grid grid-cols-2 gap-x-2 gap-y-2 mt-2">
                <MobileUI products={currentProducts}/>
            </div>
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