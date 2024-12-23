"use client"

import NavPage from "./NavPage"
import LoginButton from "./LoginButton"
import { allPages } from '../../../libs/pages'

export default function NavLink({ isAuth }: { isAuth: boolean }){
    let pages = allPages
    if(isAuth) pages = pages.filter(page=>page.text !== "Masuk")
    return pages.map((page, index)=>{
        return page.text === 'Masuk' ? <LoginButton page={page} index={index}/> : <NavPage page={page} index={index}/>
    })
}