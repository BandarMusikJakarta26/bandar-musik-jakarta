import { useState } from "react";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import disc from '../../../public/utils/disc.png'

export default function ParentMobileUI({ product, according, index, children }: { product: any, according: string, index: number, children: any }){
    const [copied, setCopied] = useState<boolean>(false);
    const [cursor, setCursor] = useState<boolean>(false);

    function copyLink(){
        const el = document.createElement('input');
        el.value = `https://bandarmusikjakarta.com/produk/${product.url}`;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        return setCopied(true)
    }
    
    if(according == "admin")return (
        <div className="flex bg-primary rounded-lg overflow-hidden items-center group flex-col relative border-[1px] border-gray-300 justify-between" key={index}>
            { children }
            
        </div>)
    else return (
        <div className="user relative">
        
        {product.promo && product.stock && product.stock > 0 && product.namaPromo == "Java Jazz" ? <img src={disc} alt={disc} className="absolute top-[5px] left-[5px] w-7 z-20"/> : false }

        <div className="share absolute bottom-[18px] right-[10px] z-20 border-[1px] border-gray-200 flex items-center p-[6px] rounded-full bg-primary md:bg-white" onMouseOver={()=>setCursor(true)} onMouseLeave={()=>setCursor(false)} >
                                <button onClick={()=>copyLink()}>
                                <PiPaperPlaneTiltBold size={14} className={`text-third ${copied && 'opacity-30'} transition duration-500`}/>
                                </button>               
                            </div>
        
                            <div className={`absolute bottom-[80px] right-[-4px] opacity-0 ${cursor && 'z-30 opacity-100'} text-[8px] bg-primary border-[1px] border-gray-300 italic rounded-lg transition duration-500 py-[1px] text-center w-[54px]`}>
                                <p>{copied ? 'Tersalin' : 'Salin'}</p>
                            </div>
        <a className="flex bg-primary rounded-lg items-center group flex-col relative border-[1px] border-gray-300 justify-between" key={index} href={`/produk/${product.url}`}>
            { children }
        </a>
        </div>
    )
}