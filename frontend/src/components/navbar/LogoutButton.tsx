import { useNavigate } from "react-router"
import { RiLogoutBoxRLine } from "react-icons/ri";
import { doLogout } from "../../action/auth.action"
import { useEffect, useState } from "react";

export default function LogoutButton(){
    const navigate = useNavigate()
    const [ screen, setScreen ] = useState<number>(window.innerWidth)

    useEffect(()=>setScreen(window.innerWidth), [])

    if(screen <= 768) return <button onClick={()=>doLogout(navigate)}><RiLogoutBoxRLine size={26}/></button>
    else return <button className='bg-red-600 px-6 py-1 text-primary rounded-3xl hover:brightness-75' onClick={()=>doLogout(navigate)}>Keluar</button>
}