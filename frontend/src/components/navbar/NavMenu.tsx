
import { useState } from "react"
import NavLink from "./NavLink"
import NavSearch from "./NavSearch"
import BMJLogo from '/utils/BMJLogo.png'
import axios from "axios"
import { useNavigate } from "react-router"
import { host } from "../../../libs/config"

export default function NavMenu(){
    const [ auth, setAuth ] = useState<boolean>(false)
    const navigate = useNavigate()

    
    async function getToken(){
        const response = await axios.get(`${host}/token`)
        return setAuth(response.data.accessToken ? true :  false)
    }
    getToken()


    async function doLogout(){
        await axios.get(`${host}/user/logout`)
        return navigate(0)
    }

    return (
        <div className="nav w-full flex justify-between mx-auto py-6 px-[160px] items-center gap-x-[80px] fixed z-10 left-0 top-0 bg-primary drop-shadow-lg">
            <a href={'/'} className="w-full flex items-center justify-center">
                <img src={BMJLogo} width={220} alt="bandarmusikjakartalogo"/>
            </a>
            <NavSearch/>
            <div className="links flex gap-x-6 items-center">
                <NavLink isAuth={auth}/>
            </div>
            { auth && <button onClick={doLogout}>Keluar</button> }
        </div> 
        
    )
}