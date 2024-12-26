
import { useState, useEffect } from "react"
import LogoutButton from "./LogoutButton"
import NavSearch from "./NavSearch"
import NavLogo from "./NavLogo"
import NavLink from "./NavLink"

import axios from "axios"
import { host } from "../../../libs/config"
import { useNavigate } from "react-router"

export default function NavMenu(){
    const [ auth, setAuth ] = useState<boolean>(false)
    const navigate = useNavigate()

    async function getToken(){
        const response = await axios.get(`${host}/token`)
        return setAuth(response.data.accessToken ? true :  false)
    }

    getToken()

    useEffect(()=>{ auth && navigate(0) },[])

    return (
        <div className="nav w-full flex justify-between mx-auto py-6 px-[160px] items-center gap-x-[80px] fixed z-10 left-0 top-0 bg-primary drop-shadow-lg">
            <NavLogo/>
            <NavSearch/>
            <div className="links flex gap-x-6 items-center">
                <NavLink isAuth={auth}/>
            </div>
            { auth && <LogoutButton/>}
        </div> 
        
    )
}