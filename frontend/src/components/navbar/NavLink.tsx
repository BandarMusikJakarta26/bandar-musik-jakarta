"use client"

import { useLocation } from "react-router"

type PageType = { url: string, text: string }

let pages: PageType[] = [
    { url: '/', text: 'Beranda' },
    { url: '/terbaru', text: 'Terbaru' },
    { url: '/kategori', text: 'Kategori' },
    { url: '/brand', text: 'Brand' },
    { url: '/about', text: 'About' },
    { url: '/user/login', text: 'Masuk' },
]

export default function NavLink({ isAuth }: { isAuth: boolean }){
    const { pathname } = useLocation()
    if(isAuth) pages = pages.filter(page=>page.text !== "Masuk")
    return pages.map((page, index)=>{
        if(page.text === 'Masuk'){
            return <a href={page.url} key={index} className="uppercase font-normal text-[18px] bg-third py-2 px-6 rounded-3xl text-primary border-2 border-third hover:bg-primary hover:text-third transition-all">{page.text}</a>
        }
        return <a href={page.url} key={index} className={`${page.url === pathname ? 'opacity-100' : 'opacity-60 hover:opacity-100 transition-all'} uppercase font-normal text-[18px]`}>{page.text}</a>
    })
}