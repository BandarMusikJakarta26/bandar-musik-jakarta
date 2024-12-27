import BMJLogo from '/utils/BMJLogo.png'

export default function NavLogo(){


    return (
        <a href={'/'} className="w-full flex items-center justify-center">
            <img src={BMJLogo} width={200} alt="bandarmusikjakartalogo"/>
        </a>
    )
}