import { useLocation } from "react-router"

export default function NavPage({ page, index, openKategoriTab }: { page: any, index: number, openKategoriTab: any }){
    const { pathname } = useLocation()

    return <a href={page.url} key={index} className={`${page.text} ${page.url === pathname ? 'opacity-100' : 'opacity-60 hover:opacity-100 transition-all'} uppercase font-normal text-[14px] md:text-[16px] bg-third py-3 px-8 md:p-0 md:bg-primary hover:brightness-125 md:hover:brightness-100`} onMouseEnter={()=>page.text == "Kategori" && openKategoriTab(true)}>{page.text}</a>
}