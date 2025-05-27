
import React, { useState, useEffect, Suspense, lazy } from "react"
import LogoutButton from "./LogoutButton"
import NavLogo from "./NavLogo"
import NavLink from "./NavLink"
import indonesia from '/utils/indonesia.png'
import amerika from '/utils/amerika.png'

import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegWindowClose } from "react-icons/fa";
import responsivePage from "../../action/screen.action"
import KategoriTab from "./KategoriTab"
// import { changeCurrency } from "../../../libs/store";
// import KategoriTab from "./KategoriTab"
const NavSearch = lazy(()=>import('./NavSearch'))

// export const KategoriContext = createContext<any>(null)

const NavMenu = function({ login, currentLogin, convertUsd, setUsdConverter } : { login: boolean, currentLogin: boolean, convertUsd: boolean, setUsdConverter: any }){

    const [ screen, setScreen ] = useState<number>(window.innerWidth)
    const [ pages, showPages ] = useState<boolean>(false)
    const [ auth, setAuth ] = useState<boolean>(false)
    const [ kategoriTab, openKategoriTab ] = useState<boolean>(false)

    useEffect(()=>{ login || (!login && currentLogin) ? setAuth(true) : false })
    useEffect(()=>{ responsivePage(setScreen) }, [])

    return (
        <div className="nav w-full flex flex-col md:flex-row md:justify-between mx-auto py-4 md:py-4 md:px-[160px] items-center gap-x-[80px] fixed z-50 left-0 top-0 bg-primary drop-shadow-lg gap-y-2 md:gap-y-0 md:gap-x-8" onMouseLeave={()=>openKategoriTab(false)}>
            <NavLogo/>
            <div className="nav-mobile flex justify-between w-full px-6 gap-x-4 md:p-0 md:static">
                <Suspense fallback={false}>
                    <NavSearch/>
                </Suspense>
                { auth && screen <= 768 ? <LogoutButton/> : false}
                { screen <= 768 && <button onClick={()=>showPages(true)}><GiHamburgerMenu size={30}/></button> }
            </div>
            <div className={`${!pages && screen <= 768 ? 'translate-x-[480px]' : 'translate-x-0'} flex links gap-x-6 absolute flex-col top-[0] left-0 bg-third w-full text-primary md:flex-row md:static md:flex md:bg-primary md:text-third md:items-center h-[100vh] md:h-auto transition duration-1000`}>
                <div className={`flex navbar-head px-8 py-5 justify-between ${!pages && screen > 768 ? 'hidden' : ''}`}>
                    <h1 className="text-[20px]">Halaman</h1>
                    <button onClick={()=>showPages(false)} ><FaRegWindowClose size={26} className="opacity-50 hover:opacity-100"/></button>
                </div>
                <div className="garis w-full border-[1px] border-primary opacity-10"></div>
                <NavLink isAuth={auth} openKategoriTab={openKategoriTab}/>

                <div className="currency flex border-[1px] border-gray-200 pr-8 pl-2 py-1 hover:border-third transition-all">

                {convertUsd ? <img src={amerika} alt={amerika} width={25}/> : <img src={indonesia} alt={amerika} width={25}/>} 
                <select onChange={(e:any)=>{
                    if(e.target.value == "usd" && convertUsd) setUsdConverter(false)
                    else setUsdConverter(true)
                }} className="px-2 font-semibold border-none outline-none text-[14px] bg-primary">
                    <option value="idr"><img src={indonesia} alt="" width={200}/> IDR</option>
                    <option value="usd">USD</option>
                </select>

                </div>
            
            </div>
            { auth && screen >= 768 ? <LogoutButton/> : false}

            {kategoriTab && <KategoriTab/>}
            {kategoriTab && <div className="overlayPage w-full bg-black h-[100vh] fixed z-10 opacity-50 top-[108px] left-0" onMouseEnter={()=>openKategoriTab(false)}></div>}

        </div> 
        
    )
}

export default React.memo(NavMenu)