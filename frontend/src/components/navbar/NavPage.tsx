import { useLocation } from "react-router"

export default function NavPage({ page, index }: { page: any, index: number }){
    const { pathname } = useLocation()
    return <a href={page.url} key={index} className={`${page.url === pathname ? 'opacity-100' : 'opacity-60 hover:opacity-100 transition-all'} uppercase font-normal text-[18px] bg-third py-3 px-8 md:p-0 md:bg-primary hover:brightness-125 md:hover:brightness-100`}>{page.text}</a>
}