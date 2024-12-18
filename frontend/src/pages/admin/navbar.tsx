import { useLocation } from "react-router"

const navs = [
    { name: "Dashboard", url: "/admin/dashboard" },
    { name: "Daftar Brand", url: "/admin/brand" },
    { name: "Daftar Kategori", url: "/admin/kategori" },
    { name: "Daftar Produk", url: "/admin/produk" },
]

export default function NavAdmin(){
    function ShowMenu(){
        const {pathname} = useLocation()
        return navs.map((nav, index)=>{
            return <a href={nav.url} key={index} className={`${nav.url === pathname ? 'opacity-100' : 'opacity-60 hover:opacity-100 transition-all'} py-3 px-9`}>{nav.name}</a>
        })
    }

    return (
        <div className="nav-admin fixed top-[180px] left-0 bg-third text-[20px] text-primary flex flex-col z-30">
            <ShowMenu/>
        </div>
    )
}