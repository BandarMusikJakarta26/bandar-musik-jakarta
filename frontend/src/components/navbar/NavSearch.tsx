"use client"
import { FaSearch } from "react-icons/fa"
import { useEffect, useState } from "react"
import axios from "axios"
import { host } from "../../../libs/config"

export default function NavSearch(){
    const [search, setSearch] = useState<string>('')
    const [ products, setProducts ] = useState<any[]>([])
    const [ categories, setCategories ] = useState<any[]>([])
    const [ brands, setBrands ] = useState<any[]>([])
    useEffect(()=>{
        async function liveSearch(){
            const response = await axios.get(`${host}/search/${search}`)
            if(!response.data.success || search == '' || !response){
                setBrands([])
                setProducts([])
                setCategories([])
            } else {
                setBrands(response.data.brands)
                setProducts(response.data.products)
                setCategories(response.data.categories)
            }
        }
        liveSearch()
    },[search])

    function SearchBrands(){
        return brands.map((brand, index)=>{
            return (
                <div className="kotak" key={index}>
                    <h1>{brand.name}</h1>
                </div>
            )
        })
    }

    function SearchProducts(){
        return products.map((product, index)=>{
            return (
                <div className="kotak" key={index}>
                    <h1>{product.name}</h1>
                </div>
            )
        })
    }

    function SearchCategories(){
        
        return categories.map((category, index)=>{
            return (
                <div className="kotak" key={index}>
                    <h1>{category.name}</h1>
                </div>
            )
        })
    }

    return (
        <div className="search relative w-full">
                <button className="absolute top-[13px] left-[20px]"><FaSearch size={'22px'} color="gray"/></button>
                <input type="text" name="search" placeholder="Cari alat musik ...." className="bg-white px-4 py-3 rounded-full w-full font-[16px] indent-10 border-2 border-primary placeholder:text-gray-500 focus:border-none" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                { search !== '' ? 
                    <div className="pencarian absolute bg-primary top-[80px] px-5 py-3 text-[14px] transition-all">
                        <h1 className="font-extrabold">Kategori</h1>
                        { categories.length > 0 ? <SearchCategories/> : null }
                        <h1 className="font-extrabold">Brand</h1>
                        { brands.length > 0 ? <SearchBrands/> : null }
                        <h1 className="font-extrabold">Produk</h1>
                        { products.length > 0 ? <SearchProducts/> : null }
                    </div> : false }
                
        </div>
    )
}