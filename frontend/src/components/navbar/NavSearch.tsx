"use client"
import { FaSearch } from "react-icons/fa"
import React, { lazy, Suspense, useEffect, useState } from "react"
import axiosClient from "../../../libs/axiosConfig"
const TabPencarian = lazy(()=>import("./TabPencarian"))

const NavSearch = function(){
    const [keyword, setKeyword] = useState<string>('')
    // const [temporary, setTemporary] = useState<string>('')
    const [result, setResult] = useState<{ products: any[], brands: any[], categories: any[] }>({ products: [], brands: [], categories: [] })

    console.log(setKeyword)
    useEffect(()=>{
        async function liveSearch(){
            const response = await axiosClient.get(`api/search/${keyword}`)
            if(!response.data.success || keyword == '' || !response) setResult({ products: [], brands: [], categories: [] })
                else setResult({ products: response.data.products, brands: response.data.brands, categories: response.data.categories })
        }
        liveSearch()
        return setResult({ products: [], brands: [], categories: [] })
    },[keyword])

    function OverlayPage(){
        return <div className="operle absolute w-full top-[108px] h-[100vh] bg-black -z-10 left-0 opacity-70"></div>
    }

    return (
        <div className="search w-full">
                <div className="relative">
                    <button className="absolute top-[10px] left-[18px]"><FaSearch size={'20px'} color="gray"/></button>
                </div>
                <form action="/pencarian">
                    <input type="text" name="search" placeholder="Cari Kebutuhanmu...." className="bg-[#fafafa] px-4 md:py-[10px] rounded-full w-full text-[12px] md:text-[15px] indent-10 border-2 border-primary placeholder:text-gray-500 focus:border-none" value={keyword} onChange={(e)=>{ setKeyword(e.target.value) }
                    }/>
                    <input type="submit" hidden/>
                </form>
                <div className="relative">
                    { keyword !== '' ?
                    <Suspense fallback={false}>
                        <TabPencarian result={result} keyword={keyword}/>
                    </Suspense>
                     : false }
                </div>
                { keyword !== '' ? <OverlayPage/> : null }
        </div>
    )
}

export default React.memo(NavSearch)