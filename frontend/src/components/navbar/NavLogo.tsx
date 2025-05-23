import { useEffect, useState } from 'react'
import BMJ from '/utils/bmjletter.png'
import BMJLogo from '/utils/BMJLogo.png'
import responsivePage from '../../action/screen.action'

export default function NavLogo(){
    const [ screen, setScreen ] = useState<number>(window.innerWidth)

    useEffect(()=>responsivePage(setScreen))

    return (
        <a href={'/'} className="w-full flex items-center justify-center gap-x-4">
            <img src={BMJ} width={screen <= 768 ? 60 : 100} alt="bandarmusikjakartalogo"/>
            <img src={BMJLogo} width={screen <= 768 ? 120 : 194} alt="bandarmusikjakartalogo" className='-mt-1'/>
        </a>
    )
}