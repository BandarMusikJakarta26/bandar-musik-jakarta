import React, { useEffect, useState } from "react"
import responsivePage from "../action/screen.action"
import DesktopUI from "./responsiveProducts/DekstopUI"
import MobileUI from "./responsiveProducts/MobileUI"
import axiosClient from "../../libs/axiosConfig"
import { FaChevronLeft, FaChevronRight, FaRegPlusSquare } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { useParams, useSearchParams } from "react-router"
import { getProductBrandByCategory, getProductByBrand, getProductByCategory, getProductCategoryByBrand } from "../action/produk.action"
import { IoSearchSharp } from "react-icons/io5";
import { host } from "../../libs/config"
import { getBrandByName, getBrandName } from "../action/brand.action"
import { getCategoryName } from "../action/kategori.action"
import { FaAngleDown } from "react-icons/fa6";
import { AxiosResponse } from "axios"
import { FaRegWindowClose } from "react-icons/fa";

function ShowPagination({ pagesNumber, currentPage, setCurrentPage }: { pagesNumber: any[], currentPage: number,setCurrentPage: React.SetStateAction<any>}){
    const totalPage = Math.floor(pagesNumber.length/20)
    let pagination = []
    for(let i = 0; i < totalPage; i++){ pagination.push(i+1) }

    const [ availablePage, setAvailablePage ] = useState<any[]>([currentPage, currentPage + 1])

    useEffect(()=>{
  
        if(currentPage == 1 && totalPage == 1){
            setAvailablePage([0, 0, currentPage, 2])
        }
        else if(currentPage == 1 && totalPage >= 2){
            setAvailablePage([0, 0, currentPage, currentPage+1, currentPage+2])
        }
        else setAvailablePage([pagination[currentPage-3], pagination[currentPage-2], currentPage, 
            pagination[currentPage] && pagination[currentPage],
            pagination[currentPage+1] && pagination[currentPage+1]])
    }, [currentPage])

    return (
        <>
            <button onClick={()=>setCurrentPage(1)}><FaAnglesLeft size={20} className="text-third opacity-40 hover:opacity-100"/></button>
            <button onClick={()=>setCurrentPage(currentPage > 1 ? currentPage-1 : 1 )}><FaChevronLeft size={20} className="text-third opacity-40 hover:opacity-100"/></button>
            { availablePage.map((value: any, index: number)=>{
                return (
                    <>
                        {(value !== 0 && value !== undefined) && <p className={`${value == currentPage ? 'opacity-100 bg-third text-primary' : 'opacity-50'} px-2 hover:cursor-pointer border-2 border-third text-[14px] md:text-[18px]`} key={index} onClick={()=>setCurrentPage(value)}>{value}</p>}
                    </>
                )
            }) }
            <button onClick={()=>{
                if(totalPage <= 1) return setCurrentPage(1)
                else return setCurrentPage(pagination[pagination.length-1] == currentPage ? pagination[pagination.length-1] : currentPage+1)
            }}><FaChevronRight size={20} className="text-third opacity-40 hover:opacity-100"/></button>
            <button onClick={()=>{
                if(totalPage <= 1) return setCurrentPage(1)
                else return setCurrentPage(pagination[pagination.length-1])
            }}><FaAnglesRight size={20} className="text-third opacity-40 hover:opacity-100"/></button>
        </>
    )

    // return pagination.map((value)=>{
    //     return <p className={`${value == currentPage ? 'opacity-100 bg-third text-primary' : 'opacity-50'} px-2 hover:cursor-pointer border-2 border-third text-[14px] md:text-[18px]`} onClick={()=>setCurrentPage(value)}>{value}</p>
    // })
}

function KategoriOption({ according, dropdownKategori, setDropdownKategori }: { according: string, dropdownKategori: boolean, setDropdownKategori: any }){
    const params = useParams() as any
    const [ searchParams ] = useSearchParams()
    const [ categoriesOption, setCategories ] = useState<{ categoriesName: any[], categories: any[] }>({ categoriesName: [], categories: [] })
    const [ tabActive, setTabActive ] = useState<boolean>(true)
    const [ screen, setScreen ] = useState<number>(window.innerWidth)

    useEffect(()=>{ responsivePage(setScreen) }, [])

    useEffect(()=>{ 
        if(according == "admin") getCategoryName(setCategories)
        else getProductCategoryByBrand(setCategories, params.name)
    }, [])

    if(categoriesOption.categoriesName && categoriesOption.categoriesName.length > 0){
        return (
            <div className={`absolute top-0 md:static ${dropdownKategori ? 'translate-x-0' : 'md:translate-x-0 translate-x-[400px]'} transition duration-700 w-full`}>
                { screen > 768 && <button className="px-6 font-semibold bg-third w-full text-left py-2 text-primary flex justify-between relative z-30 border-b-[1px] border-primary text-[12px] md:text-[16px]" onClick={()=>{
                    if(tabActive) return setTabActive(false)
                    return setTabActive(true)
                }}>
                    Kategori
                    <FaAngleDown size={16} className={`text-primary mt-[3px] ${!tabActive && '-rotate-180'} transition duration-500`}/>
                </button> }

                { screen <= 768 && <div className="px-3 font-semibold bg-third w-full text-left py-2 text-primary flex justify-between relative z-30 border-b-[1px] border-primary text-[12px] md:text-[16px] items-center">
                    <p>Kategori</p>
                    <button onClick={()=>setDropdownKategori(false)}><FaRegWindowClose size={21} className="text-primary"/></button>
                </div> }

                <div className="outer-dropdown overflow-hidden">
                    <div className={`dropdown ${tabActive ? 'translate-y-0' : 'translate-y-[-1800px] relative z-10 hidden'} transition duration-1000`}>
                        <a href={according == "admin" ? `/admin/produk` : `/brand/${params.name}`} className={`option flex justify-between px-6 py-2 hover:bg-gradient-to-r hover:from-white hover:to-primary transition border-b-[1px] border-b-primary hover:border-b-gray-300 text-[13px] ${searchParams.get('kategori') == null && 'bg-gradient-to-r from-white to-primary font-bold'}`}>
                    <div className="info flex gap-x-2 items-center">
                        <div className={`bulet w-2 h-2 md:w-4 md:h-4 border-2 border-third rounded-full ${searchParams.get('kategori') == null && 'bg-third'}`}></div>
                            <h1 className="text-[13px]">Semua</h1>
                    </div>
                    <div className="jumlah w-[20px] text-center">
                        <p className="text-[12px]">{categoriesOption.categories.length}</p>
                    </div>
                        </a>
                        { categoriesOption.categoriesName.map(kategori=>{
                    return (
                        <a href={according == "admin" ? `/admin/produk?kategori=${kategori}` : `/brand/${params.name}?kategori=${kategori}`} className={`option flex justify-between px-6 py-2 hover:bg-gradient-to-r hover:from-white hover:to-primary transition border-[1px] mt-[-1px] md:mt-0 border-gray-200 md:border-b-[1px] md:border-b-primary hover:border-b-gray-300 ${searchParams.get('kategori') == kategori && 'bg-gradient-to-r from-white to-primary'}`}>
                            <div className="info flex gap-x-2 items-center">
                            <div className={`bulet w-2 h-2 md:w-4 md:h-4 border-[1px] md:border-2 border-third rounded-full ${searchParams.get('kategori') == kategori && 'bg-third'}`}></div>
                                <h1 className={`text-[13px]  ${searchParams.get('kategori') == kategori && 'font-bold'}`}>{kategori}</h1>
                            </div>
                            <div className="jumlah w-[20px] text-center">
                                <p className="text-[12px]">{
                                categoriesOption.categories.filter(kat=>kat.kategoriId == kategori).length > 0 &&
                                categoriesOption.categories.filter(kat=>kat.kategoriId == kategori).length
                                }</p>
                            </div>
                        </a>
                    )
                        }) }
                    </div>
                </div>
            </div>
        )
    }

}

function BrandOption({ according, dropdownBrand, setDropdownBrand }: { according: string, dropdownBrand: boolean, setDropdownBrand: any }){
    const params = useParams() as any
    const [ searchParams ] = useSearchParams()
    const [ brandsOption, setBrands ] = useState<{ brandsName: any[], brands: any[] }>({ brandsName: [], brands: [] })
    const [ tabActive, setTabActive ] = useState<boolean>(true)
    const [ screen, setScreen ] = useState<number>(window.innerWidth)

    useEffect(()=>{ responsivePage(setScreen) }, [])

    useEffect(()=>{ 
        if(according == "admin") getBrandName(setBrands)
        else getProductBrandByCategory(setBrands, params.title)
    }, [])
    
    if(brandsOption.brandsName && brandsOption.brandsName.length > 0){
        return (
            <div className={`absolute top-0 md:static ${dropdownBrand ? 'translate-x-0' : 'md:translate-x-0 translate-x-[400px]'} transition duration-700 w-full`}>
                { screen > 768 && <button className="px-6 font-semibold bg-third w-full text-left py-2 text-primary flex justify-between relative z-30" onClick={()=>{
                    if(tabActive) return setTabActive(false)
                    return setTabActive(true)
                }}>
                    Brand
                    <FaAngleDown size={16} className={`text-primary mt-[3px] ${!tabActive && '-rotate-180'} transition duration-500`}/>
                </button>}

                { screen <= 768 && <div className="px-3 font-semibold bg-third w-full text-left py-2 text-primary flex justify-between relative z-30 border-b-[1px] border-primary text-[12px] md:text-[16px] items-center">
                    <p>Brand</p>
                    <button onClick={()=>setDropdownBrand(false)}><FaRegWindowClose size={21} className="text-primary"/></button>
                </div> }

                <div className="outer-dropdown overflow-hidden">
                    <div className={`dropdown ${tabActive ? 'translate-y-0' : 'translate-y-[-8000px] relative z-10 hidden'} transition duration-1000`}>

                <a href={according == "admin" ? `/admin/produk` : `/kategori/${params.title}`} className={`option flex justify-between px-6 py-2 hover:bg-gradient-to-r hover:from-white hover:to-primary transition border-b-[1px] border-b-primary hover:border-b-gray-300 text-[13px] ${searchParams.get('brand') == null && 'bg-gradient-to-r from-white to-primary'}`}>
                    <div className="info flex gap-x-2 items-center">
                        <div className={`bulet w-2 h-2 md:w-4 md:h-4 border-2 border-third rounded-full ${searchParams.get('brand') == null && 'bg-third'}`}></div>
                            <h1 className="text-[13px]">Semua</h1>
                    </div>
                    <div className="jumlah w-[20px] text-center">
                        <p className="text-[12px]">{brandsOption.brands.length}</p>
                    </div>
                </a>
                { brandsOption.brandsName.map(brand=>{
                    return (
                        <a href={according == "admin" ? `/admin/produk?brand=${brand}` : `/kategori/${params.title}?brand=${brand}`} className={`option flex justify-between px-6 py-2 hover:bg-gradient-to-r hover:from-white hover:to-primary transition border-[1px] border-gray-200 md:border-b-[1px] md:border-b-primary hover:border-b-gray-300 ${searchParams.get('brand') == brand && 'bg-gradient-to-r from-white to-primary font-bold'}`}>
                            <div className="info flex gap-x-2 items-center">
                            <div className={`bulet w-2 h-2 md:w-4 md:h-4 border-2 border-third rounded-full ${searchParams.get('brand') == brand && 'bg-third'}`}></div>
                                <h1 className={`text-[13px] ${searchParams.get('brand') == brand && 'font-bold'}`}>{brand}</h1>
                            </div>
                            <div className="jumlah w-[20px] text-center">
                                <p className="text-[12px]">{brandsOption.brands.filter(branding=>branding.brandId === brand).length > 0 && brandsOption.brands.filter(branding=>branding.brandId === brand).length}</p>
                            </div>
                        </a>
                    )
                }) }

                    </div>
                </div>
            </div>
        )
    }

}

function BrandIcon(){
    const params = useParams()
    const [ searchParams ] = useSearchParams()
    const [ brand, setBrand ] = useState<any>(null)
    const [ loading, setLoading ] = useState<boolean>(false)
    console.log(loading)

    useEffect(()=>{ getBrandByName(setBrand, setLoading, searchParams.get('brand') ? searchParams.get('brand')! : params.name! ) },[])

    if(brand) return <a href={`/brand/${brand.name}`} className="opacity-70 hover:opacity-100 transition-all"><img src={`${host}/storage/${brand.image}`} className="w-[100px]"/></a>
}

const ShowAllProducts = function({ products, according, deleteAction, setProducts, login }: { products: any[], according: string, deleteAction: any, setProducts: any, login: boolean }){
    const [ screen, setScreen ] = useState<number>(window.innerWidth)
    const [ currentPage, setCurrentPage ] = useState<number>(1)
    const [ dropdownKategori, setDropdownKategori ] = useState<boolean>(false)
    const [ dropdownBrand, setDropdownBrand ] = useState<boolean>(false)
    const params = useParams()
    const [ searchParams ]= useSearchParams()

    useEffect(()=>{ responsivePage(setScreen) })

    const productPerPage = 20
    const lastPostPage = currentPage * productPerPage
    const firstPostPage = lastPostPage - productPerPage
    const currentProducts = products.slice(firstPostPage, lastPostPage)

    async function searchProducts(keyword: string, kategoriParams: string | null, brandParams: string | null, brand: string | undefined, kategori: string | undefined){
        try{
            let response : AxiosResponse | undefined
            if(kategoriParams || kategori) response = await axiosClient(`api/produk/search/${keyword}?kategori=${kategoriParams ? kategoriParams : kategori}`)
            else if(brandParams || brand) response = await axiosClient(`api/produk/search/${keyword}?brand=${brandParams ? brandParams : brand}`)
            else response = await axiosClient(`api/produk/search/${keyword}`)

            if(response!.data.produk.length == 0 && brand) return getProductByBrand(setProducts, brand!)
            if(response!.data.produk.length == 0 && kategori) return getProductByCategory(setProducts, kategori!)
            if(response!.data.produk) return setProducts(response!.data.produk)
        }catch(err){
            let errResponse : AxiosResponse | null
            if(brand || brandParams) return getProductByBrand(setProducts, brand ? brand! : brandParams! )
            else if(kategori || kategoriParams) return getProductByCategory(setProducts, kategori ? kategori! : kategoriParams!)
            else errResponse = await axiosClient(`api/produk`)
            if(errResponse!.data.produk) return setProducts(errResponse!.data.produk)
        }
    }

    if(screen <= 768 ) return (
        <div className="relative">
            <div className={`${dropdownKategori || dropdownBrand ? 'translate-x-[-400px]' : ''} flex flex-col gap-y-4 transition duration-700`}>
            <div className="title-product flex px-2 justify-center items-center">
                <div className="pilih w-auto border-[1px] border-gray-300 rounded-lg overflow-hidden">

                    {according == "brand" && <button 
                    className={`py-1 px-5 text-[14px] border-[1px] border-third rounded-lg ${dropdownBrand && 'bg-third text-primary' } transition duration-100`}
                    onClick={()=>{
                        if(dropdownKategori) return setDropdownKategori(false)
                        else return setDropdownKategori(true)}
                    }>Kategori</button>}

                {according == "category" && <button 
                    className={`py-1 px-5 text-[14px] border-[1px] border-third rounded-lg ${dropdownBrand && 'bg-third text-primary' } transition duration-100`}
                    onClick={()=>{
                        if(dropdownBrand) return setDropdownBrand(false)
                        else return setDropdownBrand(true)}
                    }>Brand</button>}

                {according == "admin" && 
                    <div className="root">
                        <KategoriOption according={according} dropdownKategori={dropdownKategori} setDropdownKategori={setDropdownKategori}/>
                        <BrandOption according={according} dropdownBrand={dropdownBrand} setDropdownBrand={setDropdownBrand}/>
                    </div>
                }
                </div>
            </div>

            <div className="searching relative">
                    <input type="text" placeholder="Cari Produk" onChange={(e:any)=>searchProducts(e.target.value, searchParams.get('kategori') && searchParams.get('kategori'), searchParams.get('brand') && searchParams.get('brand'), params.name && params.name, params.title && params.title)} className="w-full text-[12px] py-2 rounded-3xl bg-gray-200"/>
                    <IoSearchSharp size={20} className="text-gray-400 absolute top-2 left-4"/>
            </div>

            <p className="text-[9px] text-gray-400 font-normal -mt-2 text-center">Terdapat <span className="font-semibold">{products.length}</span> produk terkait.
            </p>

            <div className="products grid grid-cols-2 gap-x-2 gap-y-2 mt-2">
                <MobileUI products={currentProducts} according={according} deleteAction={deleteAction}/>
            </div>
            <div className="pagination w-full flex justify-center gap-x-3 mt-4">
                <ShowPagination pagesNumber={products} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
            </div>
            {according == "brand" && <KategoriOption according={according} dropdownKategori={dropdownKategori} setDropdownKategori={setDropdownKategori}/> }
            {according == "category" && <BrandOption according={according} dropdownBrand={dropdownBrand} setDropdownBrand={setDropdownBrand}/> }
        </div>
    )
    else return (
        <>

            <div className="split-screen flex gap-x-4 justify-between">

            <div className="pilih w-[15%] border-[1px] border-gray-300 rounded-lg overflow-hidden">
                {according == "brand" && <KategoriOption according={according} dropdownKategori={false} setDropdownKategori={false}/>}
                {according == "category" && <BrandOption according={according} dropdownBrand={false} setDropdownBrand={false}/>}
                {according == "admin" && 
                    <div className="root">
                        <KategoriOption according={according} dropdownKategori={false} setDropdownKategori={false}/>
                        <BrandOption according={according} dropdownBrand={false} setDropdownBrand={false}/>
                    </div>
                }
            </div>

            <div className="kanan w-[85%]">

            <div className="header grid grid-cols-3 items-center px-1 mb-4">
                <div className="header-title flex flex-col">
                    <p className="text-[26px] text-third font-bold tracking-tight">
                        {according == "admin" && 'Daftar Produk' }
                        {according == "category" && params.title }
                        {according == "brand" && params.name }
                    </p>
                    <p className="text-[13px] text-third font-normal -mt-1">Terdapat <span className="font-semibold">{products.length}</span> produk terkait.
                    </p>
                </div>
                <div className="searching relative">
                    <input type="text" placeholder="Cari Produk" onChange={(e:any)=>searchProducts(e.target.value, searchParams.get('kategori') && searchParams.get('kategori'), searchParams.get('brand') && searchParams.get('brand'), params.name && params.name, params.title && params.title)} className="w-full text-[14px] py-2 rounded-3xl bg-gray-200 border-[1px] border-gray-300"/>
                    <IoSearchSharp size={24} className="text-gray-400 absolute top-2 left-4"/>
                </div>
                <div className="kanan flex justify-end gap-x-6">
                    <BrandIcon/>
                    { according == "admin" && 
                        <a href="/admin/tambah/produk" className="opacity-80 hover:opacity-100 justify-self-center self-center transition-all flex gap-x-1 md:text-[18px]  items-center"><FaRegPlusSquare size={16} className="relative"/>Tambah</a>
                    }
                </div>
            </div>

            <div className="product-list w-full grid grid-cols-1 md:grid-cols-5 gap-y-4 md:gap-x-2 md:gap-y-10">
                <DesktopUI products={currentProducts} according={login ? 'admin' : according} deleteAction={deleteAction}/>
            </div>
            
            <div className="pagination w-full mt-4 flex items-center justify-center gap-x-3">
                <ShowPagination pagesNumber={products} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>

            </div>

            </div>
        </>
    )
}

export default React.memo(ShowAllProducts)