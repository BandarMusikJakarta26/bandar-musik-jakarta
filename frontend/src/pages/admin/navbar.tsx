// import { useEffect, useState } from "react"
import { useLocation } from "react-router"
// import { isLogin } from "../../action/auth.action"
import BlankPage from "../blank"
// import { checkAdmin } from "../../action/auth.action"

const navs = [
    { name: "Dashboard", url: "/admin/dashboard" },
    { name: "Daftar Brand", url: "/admin/brand" },
    { name: "Daftar Kategori", url: "/admin/kategori" },
    { name: "Daftar Produk", url: "/admin/produk" },
    { name: "Daftar Terbaru", url: "/admin/terbaru" },
]

export default function NavAdmin({ login, currentLogin }: { login: boolean, currentLogin: boolean }){

    function ShowMenu(){
        const {pathname} = useLocation()
        return navs.map((nav, index)=>{
            return <a href={nav.url} key={index} className={`${nav.url === pathname ? 'opacity-100' : 'opacity-70 hover:opacity-100 transition-all'} md:py-3 md:px-9`}>{nav.name}</a>
        })
    }
    
    if(login || (!login && currentLogin)){
        return ( 
            <div className={`nav-admin fixed top-[123px] left-0 bg-second text-[8px] md:text-[20px] text-third flex justify-center w-full drop-shadow-xl gap-x-4 md:gap-x-5 py-2 z-40`}>
                <ShowMenu/>
            </div>

        )
    }else{ <BlankPage/> }
}