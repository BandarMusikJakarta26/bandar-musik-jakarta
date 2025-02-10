
import React, { useState, useEffect, createContext, Suspense, lazy } from "react"
import LogoutButton from "./LogoutButton"
import NavLogo from "./NavLogo"
import NavLink from "./NavLink"

import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegWindowClose } from "react-icons/fa";
import responsivePage from "../../action/screen.action"
// import KategoriTab from "./KategoriTab"
const NavSearch = lazy(()=>import('./NavSearch'))

export const KategoriContext = createContext<any>(null)

const NavMenu = function({ login, currentLogin } : { login: boolean, currentLogin: boolean }){
    const [ screen, setScreen ] = useState<number>(window.innerWidth)
    const [ pages, showPages ] = useState<boolean>(false)
    const [ auth, setAuth ] = useState<boolean>(false)
    // const [ kategoriTab, setKategoriTab ] = useState<{hoverKategori: boolean, openKategori: boolean}>({ hoverKategori: false, openKategori: false })

    useEffect(()=>{ login || (!login && currentLogin) ? setAuth(true) : false })
    useEffect(()=>{ responsivePage(setScreen) }, [])

    return (
        <div className="nav w-full flex flex-col md:flex-row md:justify-between mx-auto py-4 md:py-6 md:px-[160px] items-center gap-x-[80px] fixed z-50 left-0 top-0 bg-primary drop-shadow-lg gap-y-2 md:gap-y-0 md:gap-x-8">
            <NavLogo/>
            <div className="nav-mobile flex justify-between w-full px-6 gap-x-4 md:p-0 md:static">
                <Suspense fallback={false}>
                    <NavSearch/>
                </Suspense>
                { auth && screen <= 768 ? <LogoutButton/> : false}
                { screen <= 768 && <button onClick={()=>showPages(true)}><GiHamburgerMenu size={30}/></button> }
            </div>
            <div className={`${!pages ? 'hidden' : 'flex'} links gap-x-6 absolute flex-col top-[0] left-0 bg-third w-full text-primary md:flex-row md:static md:flex md:bg-primary md:text-third md:items-center h-[100vh] md:h-auto`}>
                <div className={`${!pages ? 'hidden': 'flex'} navbar-head px-8 py-5 justify-between`}>
                    <h1 className="text-[20px]">Halaman</h1>
                    <button onClick={()=>showPages(false)} ><FaRegWindowClose size={26} className="opacity-50 hover:opacity-100"/></button>
                </div>
                <div className="garis w-full border-[1px] border-primary opacity-10"></div>
                <NavLink isAuth={auth}/>
{/* 
                <KategoriContext.Provider value={setKategoriTab}>
                </KategoriContext.Provider> */}



            </div>
            { auth && screen >= 768 ? <LogoutButton/> : false}
            
            {/* <KategoriContext.Provider value={setKategoriTab}>
                { kategoriTab && <KategoriTab/> }
            </KategoriContext.Provider> */}
        </div> 
        
    )
}

export default React.memo(NavMenu)