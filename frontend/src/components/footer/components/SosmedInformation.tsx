import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import responsivePage from "../../../action/screen.action";

export default function SosmedInformation(){
    const [ screen, setScreen ] = useState<number>(window.innerWidth)
        
    useEffect(()=>responsivePage(setScreen))

    return (
        <div className="medsos flex justify-end items-center gap-x-4 mt-2 md:mt-0">
            <a href={'https://www.instagram.com/bandarmusikjakarta_bmj/'} target="_blank" className="opacity-60 hover:opacity-100 transition-all">
                <FaInstagram size={screen <= 768 ? 20 : 30} color="#eee"/>
            </a>
            <a href={'/'} className="opacity-60 hover:opacity-100 transition-all">
                <FaFacebookF size={screen <= 768 ? 20 : 30} color="#eee"/>
            </a>
        </div>
    )
}