import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function SosmedInformation(){
    return (
        <div className="medsos flex justify-end items-center gap-x-4">
            <a href={'https://www.instagram.com/bandarmusikjakarta_bmj/'} target="_blank" className="opacity-60 hover:opacity-100 transition-all">
                <FaInstagram size={30} color="#eee"/>
            </a>
            <a href={'/'} className="opacity-60 hover:opacity-100 transition-all">
                <FaFacebookF size={26} color="#eee"/>
            </a>
        </div>
    )
}