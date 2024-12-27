import { useEffect, useState } from "react"
import responsivePage from "../../../action/screen.action"

export default function LogoFooter(){
    const [ screen, setScreen ] = useState<number>(window.innerWidth)
    
    useEffect(()=>responsivePage(setScreen))

    return (
        <div className="gambar">
            <img src={'/utils/BMJLogoFooter.png'} alt="bandarmusikjakartalogo" width={screen <= 768 ? 200 : 240}/>
        </div>
    )
}