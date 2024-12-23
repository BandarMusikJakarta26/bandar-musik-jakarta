import { useLocation } from "react-router"

export default function NavPage({ page, index }: { page: any, index: number }){
    const { pathname } = useLocation()
    return <a href={page.url} key={index} className={`${page.url === pathname ? 'opacity-100' : 'opacity-60 hover:opacity-100 transition-all'} uppercase font-normal text-[18px]`}>{page.text}</a>
}