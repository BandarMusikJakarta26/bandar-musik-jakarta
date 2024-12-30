import { useEffect, useState } from 'react'
import BMJLogo from '/utils/BMJLogo.png'
import responsivePage from '../../action/screen.action'

export default function NavLogo(){
    const [ screen, setScreen ] = useState<number>(window.innerWidth)

    useEffect(()=>responsivePage(setScreen))

    return (
        <a href={'/'} className="w-full flex items-center justify-center">
            <img src={BMJLogo} width={screen <= 768 ? 120 : 200} alt="bandarmusikjakartalogo"/>
        </a>
    )
}