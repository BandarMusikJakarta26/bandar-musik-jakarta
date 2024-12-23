import { useNavigate } from "react-router"
import { doLogout } from "../../action/auth.action"

export default function LogoutButton(){
    const navigate = useNavigate()
    return <button className='bg-red-600 px-6 py-1 text-primary rounded-3xl hover:brightness-75' onClick={()=>doLogout(navigate)}>Keluar</button>
}