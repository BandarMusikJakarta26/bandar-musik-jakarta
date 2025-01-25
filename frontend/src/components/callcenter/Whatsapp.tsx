import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import responsivePage from "../../action/screen.action";

export default function WhatsApp(){
    const [ screen, setScreen ] = useState<number>(window.innerWidth)
        
    useEffect(()=>responsivePage(setScreen))
    return (
        <a className="whatsapp bg-green-400 rounded-full p-2 md:p-4 fixed bottom-6 md:bottom-20 right-4 md:right-7 hover:scale-105 hover:hue-rotate-60 transition-all z-50" href={'https://wa.me/62081929290560'}>
            <FaWhatsapp size={screen <= 768 ? 22 : 40} color="white"/>
        </a>
    )
}