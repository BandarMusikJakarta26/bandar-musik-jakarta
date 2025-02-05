import React, { useEffect, useState } from "react"
import responsivePage from "../action/screen.action"
import DesktopUI from "./responsiveProducts/DekstopUI"
import MobileUI from "./responsiveProducts/MobileUI"

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

const ShowAllProducts = function({ products, according, deleteAction}: { products: any[], according: string, deleteAction: any }){
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
                <MobileUI products={currentProducts} according={according} deleteAction={deleteAction}/>
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
                <DesktopUI products={currentProducts} according={according} deleteAction={deleteAction}/>
            </div>
            
            <div className="pagination w-full flex justify-center gap-x-1 md:gap-x-3 mt-4">
                <ShowPagination pagesNumber={products} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
        </>
    )
}

export default React.memo(ShowAllProducts)