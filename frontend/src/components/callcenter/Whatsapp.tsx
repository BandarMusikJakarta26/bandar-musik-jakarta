import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router";

export default function WhatsApp(){
    const { pathname } = useLocation()
    if(pathname == "/user/register" || "/user/login") return false
    else return (
        <a className="whatsapp bg-green-400 rounded-full p-4 fixed bottom-20 right-7 hover:scale-105 hover:hue-rotate-60 transition-all z-50" href={'https://wa.me/62081929290560'}>
            <FaWhatsapp size={40} color="white"/>
        </a>
    )
}