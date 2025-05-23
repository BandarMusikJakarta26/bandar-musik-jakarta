"use client"

import NavPage from "./NavPage"
import LoginButton from "./LoginButton"
import { allPages } from '../../../libs/pages'

export default function NavLink({ isAuth, openKategoriTab }: { isAuth: boolean, openKategoriTab: any }){
    let pages = allPages
    if(isAuth) pages = pages.filter(page=>page.text !== "Masuk")
    return pages.map((page, index)=>page.text === 'Masuk' ? <LoginButton page={page} index={index}/> : <NavPage page={page} index={index} openKategoriTab={openKategoriTab}/>)
}