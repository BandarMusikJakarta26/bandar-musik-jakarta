// import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { isLogin } from "../../action/auth.action"
import { useEffect, useState } from "react"
// import { checkAdmin } from "../../action/auth.action"

const navs = [
    { name: "Dashboard", url: "/admin/dashboard" },
    { name: "Daftar Brand", url: "/admin/brand" },
    { name: "Daftar Kategori", url: "/admin/kategori" },
    { name: "Daftar Produk", url: "/admin/produk" },
    { name: "Daftar Terbaru", url: "/admin/terbaru" },
]

export default function NavAdmin({ login }: { login: boolean }){
    const [ render, setRender ] = useState<boolean>(false) 

    // const navigate = useNavigate()
    // const [ admin, isAdmin ] = useState<boolean>(false) 
    // async function adminValidation() { return await isAdmin(await checkAdmin()) }
    // adminValidation()

    useEffect(()=>{ login && setRender(true) },[login])

    function ShowMenu(){
        const {pathname} = useLocation()
        return navs.map((nav, index)=>{
            return <a href={nav.url} key={index} className={`${nav.url === pathname ? 'opacity-100' : 'opacity-70 hover:opacity-100 transition-all'} md:py-3 md:px-9`}>{nav.name}</a>
        })
    }
    
    if(!render) return false
    else return ( 
        <div className={`nav-admin fixed top-[130px] left-0 bg-second text-[8px] md:text-[20px] text-third flex justify-center w-full drop-shadow-xl gap-x-4 md:gap-x-5 py-2 z-20`}>
            <ShowMenu/>
        </div>
    )
}