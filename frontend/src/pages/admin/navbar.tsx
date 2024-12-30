import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { checkAdmin } from "../../action/auth.action"

const navs = [
    { name: "Dashboard", url: "/admin/dashboard" },
    { name: "Daftar Brand", url: "/admin/brand" },
    { name: "Daftar Kategori", url: "/admin/kategori" },
    { name: "Daftar Produk", url: "/admin/produk" },
]

export default function NavAdmin(){
    const navigate = useNavigate()
    const [ admin, isAdmin ] = useState<boolean>(false) 
    async function adminValidation() { return await isAdmin(await checkAdmin()) }
    adminValidation()

    useEffect(()=>{admin && navigate(0)}, [])
    
    function ShowMenu(){
        const {pathname} = useLocation()
        return navs.map((nav, index)=>{
            return <a href={nav.url} key={index} className={`${nav.url === pathname ? 'opacity-100' : 'opacity-70 hover:opacity-100 transition-all'} md:py-3 md:px-9`}>{nav.name}</a>
        })
    }
    
    if(!admin) return false
    else return ( 
        <div className={`nav-admin fixed top-[130px] left-0 bg-second text-[11px] md:text-[20px] text-third flex justify-center w-full drop-shadow-xl gap-x-5 py-2 z-20`}>
            <ShowMenu/>
        </div>
    )
}