"use client"
import { FaSearch } from "react-icons/fa"
import { useState } from "react"

export default function NavSearch(){
    const [search, setSearch] = useState<string>('')

    return (
        <div className="search relative w-full">
                <button className="absolute top-[13px] left-[20px]"><FaSearch size={'22px'} color="gray"/></button>
                <input type="text" name="search" placeholder="Cari alat musik ...." className="bg-white px-4 py-3 rounded-full w-full font-[16px] indent-10 border-2 border-primary placeholder:text-gray-500 focus:border-none" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
        </div>
    )
}