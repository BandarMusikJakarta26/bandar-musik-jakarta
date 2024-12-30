"use client"
import { FaSearch } from "react-icons/fa"
import { useEffect, useState } from "react"
import axios from "axios"
import { host } from "../../../libs/config"
import TabPencarian from "./TabPencarian"

export default function NavSearch(){
    const [search, setSearch] = useState<string>('')
    const [result, setResult] = useState<{ products: any[], brands: any[], categories: any[] }>({ products: [], brands: [], categories: [] })

    useEffect(()=>{
        async function liveSearch(){
            const response = await axios.get(`${host}/search/${search}`)
            if(!response.data.success || search == '' || !response) setResult({ products: [], brands: [], categories: [] })
            else setResult({ products: response.data.products, brands: response.data.brands, categories: response.data.categories })
        }
        liveSearch()
    },[search])

    function OverlayPage(){
        return <div className=" operle absolute w-full top-[130px] h-[100vh] bg-black -z-10 left-0 opacity-70"></div>
    }

    return (
        <div className="search w-full">
                <div className="relative">
                    <button className="absolute top-[13px] left-[20px]"><FaSearch size={'22px'} color="gray"/></button>
                </div>
                <input type="text" name="search" placeholder="Cari Kebutuhanmu...." className="bg-white px-4 md:py-3 rounded-full w-full text-[14px] md:text-[16px] indent-10 border-2 border-primary placeholder:text-gray-500 focus:border-none" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                <div className="relative">
                    { search !== '' ? <TabPencarian result={result}/> : false }
                </div>
                { search !== '' ? <OverlayPage/> : null }
        </div>
    )
}