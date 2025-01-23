"use client"
import { FaSearch } from "react-icons/fa"
import { useEffect, useState } from "react"
import TabPencarian from "./TabPencarian"
import axiosClient from "../../../libs/axiosConfig"

export default function NavSearch(){
    const [keyword, setKeyword] = useState<string>('')
    const [result, setResult] = useState<{ products: any[], brands: any[], categories: any[] }>({ products: [], brands: [], categories: [] })

    useEffect(()=>{
        async function liveSearch(){
            const response = await axiosClient.get(`api/search/${keyword}`)
            if(!response.data.success || keyword == '' || !response) setResult({ products: [], brands: [], categories: [] })
            else setResult({ products: response.data.products, brands: response.data.brands, categories: response.data.categories })
        }
        liveSearch()
    },[keyword])

    function OverlayPage(){
        return <div className=" operle absolute w-full top-[130px] h-[100vh] bg-black -z-10 left-0 opacity-70"></div>
    }

    return (
        <div className="search w-full">
                <div className="relative">
                    <button className="absolute top-[13px] left-[20px]"><FaSearch size={'22px'} color="gray"/></button>
                </div>
                <input type="text" name="search" placeholder="Cari Kebutuhanmu...." className="bg-white px-4 md:py-3 rounded-full w-full text-[14px] md:text-[16px] indent-10 border-2 border-primary placeholder:text-gray-500 focus:border-none" value={keyword} onChange={(e)=>{setKeyword(e.target.value)}}/>
                <div className="relative">
                    { keyword !== '' ? <TabPencarian result={result}/> : false }
                </div>
                { keyword !== '' ? <OverlayPage/> : null }
        </div>
    )
}